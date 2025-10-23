# Azure Playwright Containers Starter

This repo runs Playwright tests inside a container from Azure Pipelines, using the official Playwright image.

## Steps

1. Create a new Azure DevOps repo and push these files.
2. Create a pipeline from `azure-pipelines.yml`.
3. Run the pipeline.

Outputs:
- JUnit -> Tests tab
- HTML -> Artifacts (PlaywrightHtmlReport)
