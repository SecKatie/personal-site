# Load .env file if present
set dotenv-load

# Default recipe - list available commands
default:
    @just --list

# Install dependencies
install:
    pnpm install

# Start development server
dev:
    pnpm dev

# Build the site for production
build:
    pnpm build

# Preview the production build locally
preview:
    pnpm preview

# Container registry settings
registry := "quay.io"
image_name := "kmulliken/personal-site"
local_image := "personal-site"

# Build container image locally
build-image tag="latest":
    podman build -t {{local_image}}:{{tag}} .

# Run container locally
run port="8080" tag="latest":
    podman run --rm -p {{port}}:80 {{local_image}}:{{tag}}

# Push image to registry
push tag="latest":
    podman build -t {{registry}}/{{image_name}}:{{tag}} .
    podman push {{registry}}/{{image_name}}:{{tag}}

# Build and push with git sha tag
push-sha:
    #!/usr/bin/env bash
    sha=$(git rev-parse --short HEAD)
    just push "sha-${sha}"
    just push latest

# Get the digest of the latest image from registry
get-digest:
    #!/usr/bin/env bash
    podman pull {{registry}}/{{image_name}}:latest
    podman inspect {{registry}}/{{image_name}}:latest | jq -r '.[0].Digest'

# Update deployment.yaml with current registry digest
update-deployment:
    #!/usr/bin/env bash
    digest=$(podman inspect {{registry}}/{{image_name}}:latest | jq -r '.[0].Digest')
    image_with_digest="{{registry}}/{{image_name}}@${digest}"
    echo "Updating deployment to: ${image_with_digest}"
    sed -i.bak "s|image: quay.io/kmulliken/personal-site.*|image: ${image_with_digest}|g" k8s/deployment.yaml
    rm k8s/deployment.yaml.bak
    git diff k8s/deployment.yaml

# Clean build artifacts
clean:
    rm -rf dist

# Full clean including node_modules
clean-all:
    rm -rf dist node_modules

# Reinstall dependencies from scratch
reinstall: clean-all install
