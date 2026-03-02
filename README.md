# Jupyter PDF Fast Export

This extension allows you to export Jupyter Notebooks (.ipynb) to PDF with optimized image scaling and word wrap using Playwright.

## Features
- One-click PDF export.
- Automatic image scaling (prevents large plots from being cut off).
- Smart code line wrapping.

## Requirements
To use this extension, you need Python installed with the following packages:
```bash
pip install nbconvert nbformat playwright
playwright install chromium