# Deployment Guide

This project includes GitHub Actions workflows for CI/CD and deployment.

## GitHub Actions Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)
- Runs on every push and pull request
- Builds the Next.js application
- Runs linter checks
- Ensures code quality before merging

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)
- Runs on pushes to `main` or `master` branch
- Builds the application
- Deploys to Vercel (if configured)

## Deployment Options

### Option 1: Deploy to Vercel (Recommended for Next.js)

#### Setup Steps:

1. **Create a Vercel Account** (if you don't have one)
   - Go to [vercel.com](https://vercel.com) and sign up

2. **Create a New Project on Vercel**
   - Connect your GitHub repository
   - Vercel will automatically detect Next.js configuration

3. **Get Vercel Credentials**
   - Go to Vercel Dashboard → Settings → General
   - Copy your **Organization ID** and **Project ID**

4. **Generate a Vercel Token**
   - Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions

5. **Add Secrets to GitHub Repository**
   - Go to your GitHub repository
   - Navigate to **Settings → Secrets and variables → Actions**
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID

6. **Push to Main Branch**
   - Push your code to `main` or `master` branch
   - The workflow will automatically deploy to Vercel

### Option 2: Deploy to Other Platforms

If you want to deploy to other platforms (Netlify, Railway, etc.), you can:

1. Modify `.github/workflows/deploy.yml` to add your platform's deployment steps
2. Add the required secrets to GitHub
3. Update the deployment configuration

### Option 3: Manual Deployment

You can also deploy manually by running:

```bash
npm run build
npm run start
```

## Environment Variables

If your application requires environment variables:

1. Add them to your hosting platform (Vercel, etc.)
2. For GitHub Actions, add them as secrets in repository settings
3. Reference them in the workflow files using `${{ secrets.VARIABLE_NAME }}`

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure Node.js version matches (currently set to 20)
- Review build logs in GitHub Actions

### Deployment Fails
- Verify all required secrets are set correctly
- Check that your Vercel project ID and org ID are correct
- Ensure your Vercel token has the right permissions

## Next Steps

After setting up deployment:
1. Push your code to GitHub
2. Watch the Actions tab for deployment status
3. Your site will be live at the Vercel URL (or your chosen platform)
