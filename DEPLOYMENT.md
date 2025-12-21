# Deployment Migration Guide

This guide walks you through migrating the personal-site deployment from the infra-management repo to self-contained deployment in the personal-site repo.

## What Changed

### Before (Old Setup)
- K8s manifests stored in `infra-management/k8s-apps/personal-site/`
- Deployment used init containers to git clone and build on every pod start
- Managed by the ApplicationSet auto-discovery
- ~2-3 minute startup time per pod due to build process

### After (New Setup)
- K8s manifests stored in `personal-site/k8s/`
- Deployment uses pre-built container images from Quay.io
- Managed by dedicated ArgoCD Application
- ~10 second startup time per pod
- Automatic deployments when you push content changes

## Migration Steps

### 1. Cloudflare Tunnel SealedSecret ✅ 

**Status: Already Created!**

The SealedSecret has been created from your existing cluster secret and is included in the deployment:
- `k8s/sealedsecret.yaml` - Contains the sealed Cloudflare tunnel credentials
- Already enabled in `k8s/kustomization.yaml`

The credentials were pulled from your running cluster and sealed using your `sealed-secrets` controller in the `kube-system` namespace.

### 2. Push the Kubernetes Manifests

Commit and push the new `k8s/` directory to your personal-site repo:

```bash
cd /Users/katiemulliken/Documents/Projects/personal-site
git add k8s/ DEPLOYMENT.md
git commit -m "Add Kubernetes manifests with SealedSecret for ArgoCD self-management"
git push origin main
```

### 3. Deploy the ArgoCD Application

Push the new ArgoCD Application manifest to your infra-management repo:

```bash
cd /Users/katiemulliken/Documents/Projects/infra-management
git add k8s-apps/personal-site-app/
git commit -m "Add ArgoCD Application for personal-site"
git push origin main
```

The ApplicationSet will automatically discover and deploy the new `personal-site-app` Application within ~3 minutes.

### 4. Remove the Old Manifests (After Verification)

**Important:** Only do this after verifying the new deployment is working correctly (see step 5).

Once confirmed, remove the old manifests:

```bash
cd /Users/katiemulliken/Documents/Projects/infra-management
git rm -r k8s-apps/personal-site/
git commit -m "Remove old personal-site manifests (now managed in personal-site repo)"
git push origin main
```

The old `personal-site` Application created by ApplicationSet will be removed. The new `personal-site-app` Application will continue managing the namespace and resources.

### 5. Verify the Deployment

Check that everything is working:

```bash
# Check the ArgoCD application
kubectl get application personal-site -n argocd

# Verify pods are running with the new image
kubectl get pods -n personal-site
kubectl get deployment personal-site -n personal-site -o jsonpath='{.spec.template.spec.containers[0].image}'

# Should show: quay.io/kmulliken/personal-site:latest
```

## How It Works Now

### When You Push Content Changes

1. **Edit your content** (e.g., `src/content/Home.mdx`)
2. **Commit and push** to the main branch
3. **GitHub Actions** automatically:
   - Builds a new container image for **both amd64 and arm64**
   - Creates a multi-arch manifest
   - Pushes to Quay.io with tags (`latest`, `sha-<commit>`)
   - Updates `k8s/deployment.yaml` with the new manifest digest
   - Commits the updated deployment back to the repo
4. **ArgoCD** detects the deployment change and syncs automatically
5. **Kubernetes** performs a rolling update with the new image
6. **Live in ~5 minutes** total

**Note:** The deployment now uses image digests (e.g., `@sha256:abc123...`) instead of tags, ensuring ArgoCD can detect actual changes and avoiding caching issues.

### When You Update K8s Manifests

1. **Edit manifests** in `k8s/` directory
2. **Commit and push** to the main branch
3. **ArgoCD** syncs and applies the changes automatically
4. **Live in ~3 minutes**

## Rollback Procedure

If something goes wrong, you can quickly rollback:

### Rollback the Kubernetes Deployment

```bash
kubectl rollout undo deployment/personal-site -n personal-site
```

### Rollback to Old Setup

If you need to revert to the old init-container-based deployment:

```bash
# Re-apply the old manifests
cd /path/to/infra-management
git revert <commit-hash>  # revert the commit that removed k8s-apps/personal-site
git push origin main

# Delete the new Application
kubectl delete application personal-site -n argocd
```

## Testing the Setup

### Test 1: Content Update

1. Edit `src/content/Home.mdx`
2. Make a small change (e.g., add a line of text)
3. Commit and push:
   ```bash
   git add src/content/Home.mdx
   git commit -m "Test: update home page content"
   git push origin main
   ```
4. Watch GitHub Actions build: https://github.com/SecKatie/personal-site/actions
5. Wait for ArgoCD to sync (or force sync):
   ```bash
   argocd app sync personal-site
   ```
6. Verify the change is live at https://mulliken.net

### Test 2: Manifest Update

1. Edit `k8s/deployment.yaml` (e.g., change replica count)
2. Commit and push:
   ```bash
   git add k8s/deployment.yaml
   git commit -m "Test: update replica count"
   git push origin main
   ```
3. Watch ArgoCD sync:
   ```bash
   kubectl get application personal-site -n argocd -w
   ```
4. Verify the change:
   ```bash
   kubectl get deployment personal-site -n personal-site
   ```

## Optimization: ArgoCD Webhook

For instant deployments instead of 3-minute polling, configure a webhook:

### Set up GitHub Webhook

1. Get your ArgoCD webhook URL:
   ```bash
   echo "https://<your-argocd-url>/api/webhook"
   ```

2. In GitHub, go to Settings → Webhooks → Add webhook
   - Payload URL: `https://<your-argocd-url>/api/webhook`
   - Content type: `application/json`
   - Events: Just the push event
   - Active: ✓

3. ArgoCD will now sync immediately when you push changes!

## GitHub Actions Setup

The repository includes a GitHub Actions workflow that automatically builds and deploys on every push to `main`.

### Required GitHub Secrets

You need to configure these secrets in your repository (Settings → Secrets and variables → Actions):

1. **QUAY_USERNAME** - Your Quay.io username (or robot account name)
2. **QUAY_PASSWORD** - Your Quay.io password (or robot account token)

See `.github/README.md` for detailed setup instructions.

## Benefits of New Setup

✅ **Faster deployments**: Pod startup in ~10s instead of 2-3 minutes  
✅ **Reduced resource usage**: No CPU/memory spent on building during pod start  
✅ **Self-contained**: K8s manifests live with the code  
✅ **Automatic updates**: Push content changes → automatic deployment  
✅ **Better separation**: Infrastructure repo for infra, app repo for app  
✅ **Easier collaboration**: Contributors can see deployment config  
✅ **Immutable deployments**: Container images are built once and reused  
✅ **Image digests**: ArgoCD can detect real changes, no cache issues with `:latest`  

## What Was Set Up

### Files Created in personal-site repo:
- `k8s/namespace.yaml` - Namespace definition
- `k8s/deployment.yaml` - Deployment using pre-built images from quay.io
- `k8s/service.yaml` - ClusterIP service
- `k8s/cloudflare-tunnel.yaml` - Cloudflare tunnel for mulliken.net
- `k8s/sealedsecret.yaml` - Sealed tunnel credentials (safe to commit)
- `k8s/kustomization.yaml` - Kustomize configuration
- `k8s/README.md` - Operational documentation
- `DEPLOYMENT.md` - This migration guide

### Files Created in infra-management repo:
- `k8s-apps/personal-site-app/application.yaml` - ArgoCD Application pointing to personal-site repo
- `k8s-apps/personal-site-app/kustomization.yaml` - Kustomize wrapper

### Key Changes:
1. **No more init containers** - Uses pre-built images (10s startup vs 2-3 minutes)
2. **GitOps with SealedSecrets** - Tunnel credentials encrypted and version controlled
3. **Self-contained deployment** - K8s manifests live with the application code
4. **Automatic updates** - Push to main → GitHub Actions builds → ArgoCD deploys

## Need Help?

See `k8s/README.md` for detailed operational documentation.
