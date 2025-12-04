# Personal Site

A simple static landing page built with [Astro](https://astro.build/) and MDX.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Editing Content

The site content is in `src/pages/index.mdx`. Edit this file to update the landing page.

The layout and styles are in `src/layouts/Layout.astro`.

## Deployment

The site is automatically built and deployed when you push to the `main` branch:

1. GitHub Actions builds the Docker image
2. Image is pushed to `quay.io/kmulliken/personal-site`
3. Restart the Kubernetes deployment to pull the new image:
   ```bash
   kubectl rollout restart deployment/personal-site -n personal-site
   ```

## Adding a Blog (Future)

To add blog functionality later:

1. Install the content collections feature
2. Create `src/content/blog/` directory
3. Add MDX files for blog posts
4. Create a blog listing page and post layout

See [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) for details.
