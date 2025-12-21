# GitHub Actions Configuration

## Required Secrets

To use the automated build and deploy workflow, you need to configure the following secrets in your GitHub repository:

### Setting up Secrets

Go to: **Settings → Secrets and variables → Actions → New repository secret**

1. **QUAY_USERNAME**
   - Your Quay.io username
   - Example: `kmulliken`

2. **QUAY_PASSWORD**
   - Your Quay.io password or robot account token
   - **Recommended**: Create a [robot account](https://quay.io/organization/kmulliken?tab=robots) for better security
   - Permissions needed: Write to `personal-site` repository

### How to Create a Quay.io Robot Account (Recommended)

1. Go to https://quay.io/organization/kmulliken?tab=robots
2. Click "Create Robot Account"
3. Name it something like `github_actions_personal_site`
4. Grant it **Write** permissions to the `personal-site` repository
5. Copy the robot account name (e.g., `kmulliken+github_actions_personal_site`) as `QUAY_USERNAME`
6. Copy the generated token as `QUAY_PASSWORD`

## Workflow Overview

The `build.yml` workflow:

1. **Triggers** on every push to `main` branch or manual dispatch
2. **Builds** the Docker image for **both amd64 and arm64** architectures using buildah
3. **Tags** the image with:
   - `latest` - always points to the most recent build
   - `sha-<commit>` - specific commit SHA for traceability
   - `main` - branch name tag
4. **Creates a multi-arch manifest** combining both architectures
5. **Pushes** to `quay.io/kmulliken/personal-site`
6. **Updates** `k8s/deployment.yaml` with the manifest digest
7. **Commits** the updated deployment back to the repo
8. **ArgoCD** detects the change and deploys automatically

**Multi-Architecture Support:**
- Builds natively on both AMD64 and ARM64 runners for optimal performance
- Creates a single manifest that works on both architectures
- Perfect for mixed clusters (x86 servers + Raspberry Pi ARM nodes)

## Image Digest Strategy

The workflow uses **image digests** instead of tags:
- ✅ ArgoCD can detect when the image actually changes
- ✅ Immutable - digest always points to the exact same image
- ✅ No cache issues with `:latest` tag
- ✅ Better audit trail

Example:
```yaml
image: quay.io/kmulliken/personal-site@sha256:abc123...
```

## Manual Deployment

If you need to manually build and push:

```bash
# Using the justfile
just push

# Or build and push with git SHA
just push-sha
```

## Troubleshooting

### Build fails with authentication error
- Check that `QUAY_USERNAME` and `QUAY_PASSWORD` secrets are set correctly
- Verify the robot account has write permissions

### ArgoCD not syncing
- Check ArgoCD sync policy (should be automatic)
- Verify the Application points to the correct repo and path
- Force sync: `argocd app sync personal-site`

### Image not updating
- Check GitHub Actions logs
- Verify the digest was updated in `k8s/deployment.yaml`
- Ensure ArgoCD can reach the GitHub repo

