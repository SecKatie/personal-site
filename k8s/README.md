# Personal Site Kubernetes Deployment

This directory contains the Kubernetes manifests for deploying the personal site to your K3s cluster with ArgoCD.

## Architecture

The deployment consists of:

1. **Deployment**: Runs the pre-built container image from Quay.io (`quay.io/kmulliken/personal-site:latest`)
2. **Service**: Exposes the deployment within the cluster
3. **Cloudflare Tunnel**: Routes traffic from `mulliken.net` to the service

## How It Works

### Automated Deployment Pipeline

When you push changes to your site:

```
Push to main → GitHub Actions builds image → Pushes to Quay.io → ArgoCD syncs → Deployment updates
```

1. **GitHub Actions** (`.github/workflows/build.yml`):
   - Triggered on push to `main` branch
   - Builds multi-arch container image (amd64 + arm64)
   - Pushes to `quay.io/kmulliken/personal-site:latest`

2. **ArgoCD**:
   - Watches the `k8s/` directory in this repo
   - Automatically syncs when changes are detected
   - Configured with `imagePullPolicy: Always` to pull the latest image
   - Auto-sync and self-heal enabled

3. **Kubernetes**:
   - Rolling update deploys the new image
   - Zero-downtime deployment (maxUnavailable: 0)
   - Health checks ensure the new pod is ready before removing the old one

### Content Updates

When you update content (like `src/content/Home.mdx`):

1. Push the changes to the `main` branch
2. GitHub Actions automatically builds a new container image
3. ArgoCD detects the image update and triggers a rolling restart
4. Your changes are live in ~3-5 minutes (build time + deployment time)

## Initial Setup

### Prerequisites

- K3s cluster with ArgoCD installed
- Cloudflare tunnel configured with credentials secret
- GitHub Actions secrets configured:
  - `QUAY_USERNAME`
  - `QUAY_PASSWORD`

### Deploy with ArgoCD

The ArgoCD Application is managed in the `infra-management` repo at:
`k8s-apps/personal-site-app/application.yaml`

Your ApplicationSet will automatically discover and deploy it.

To manually apply:

```bash
kubectl apply -k /path/to/infra-management/k8s-apps/personal-site-app/
```

### Create Cloudflare Tunnel SealedSecret

You have two options:

**Option A: Use existing secret** (if upgrading from old deployment)

The existing `personal-site-tunnel-credentials` secret will continue to work.

**Option B: Create new SealedSecret** (recommended for GitOps)

1. Get your Cloudflare tunnel credentials JSON file
2. Create and seal the secret:

```bash
kubectl create secret generic personal-site-tunnel-credentials \
  --from-file=credentials.json=/path/to/tunnel-credentials.json \
  --namespace=personal-site \
  --dry-run=client -o yaml | \
kubeseal -o yaml > k8s/sealedsecret.yaml
```

3. Uncomment the sealedsecret resource in `k8s/kustomization.yaml`
4. Commit and push the change

## Manual Operations

### Check Deployment Status

```bash
# View the application in ArgoCD
kubectl get application personal-site -n argocd

# Check pod status
kubectl get pods -n personal-site

# View logs
kubectl logs -n personal-site -l app.kubernetes.io/name=personal-site

# Check current image
kubectl get deployment personal-site -n personal-site -o jsonpath='{.spec.template.spec.containers[0].image}'
```

### Force Restart

To force a restart without code changes:

```bash
kubectl rollout restart deployment/personal-site -n personal-site
```

### Sync from ArgoCD

```bash
# Sync the application
argocd app sync personal-site

# Force refresh (check for new changes)
argocd app get personal-site --refresh
```

## Troubleshooting

### Deployment Not Updating

1. Check if the image was pushed to Quay.io:
   ```bash
   podman pull quay.io/kmulliken/personal-site:latest
   ```

2. Check ArgoCD sync status:
   ```bash
   kubectl get application personal-site -n argocd -o yaml
   ```

3. Manually trigger a rollout:
   ```bash
   kubectl rollout restart deployment/personal-site -n personal-site
   ```

### Pod Not Starting

1. Check pod events:
   ```bash
   kubectl describe pod -n personal-site -l app.kubernetes.io/name=personal-site
   ```

2. Check pod logs:
   ```bash
   kubectl logs -n personal-site -l app.kubernetes.io/name=personal-site
   ```

### Cloudflare Tunnel Issues

1. Check tunnel status:
   ```bash
   kubectl logs -n personal-site -l app.kubernetes.io/name=cloudflared
   ```

2. Verify the secret exists:
   ```bash
   kubectl get secret personal-site-tunnel-credentials -n personal-site
   ```

## Configuration

### Update Image Tag

To use a specific image tag instead of `latest`, edit `k8s/deployment.yaml`:

```yaml
spec:
  template:
    spec:
      containers:
        - name: personal-site
          image: quay.io/kmulliken/personal-site:sha-abc1234
```

### Adjust Resources

To modify CPU/memory limits, edit `k8s/deployment.yaml`:

```yaml
resources:
  requests:
    cpu: 10m
    memory: 32Mi
  limits:
    cpu: 100m
    memory: 64Mi
```

### Scale Replicas

To run multiple pods:

```bash
kubectl scale deployment personal-site -n personal-site --replicas=2
```

Or edit `k8s/deployment.yaml`:

```yaml
spec:
  replicas: 2
```

## Cleanup

To remove the deployment:

```bash
# Delete the ArgoCD application (will cascade delete all resources)
kubectl delete application personal-site -n argocd

# Or manually delete
kubectl delete -k k8s/
```

