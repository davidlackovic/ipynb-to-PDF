# Jupyter to PDF Fast Export

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
```

## Installation
To use this extension, follow these steps:

1. **Download the Extension:** Go to the [Releases](https://github.com/davidlackovic/ipynb-to-PDF/releases) page and download the latest `.vsix` file.
2. **Install in VS Code:** - Open Visual Studio Code.
   - Go to the **Extensions** view (`Ctrl+Shift+X`).
   - Click the three dots `...` in the top right corner.
   - Select **Install from VSIX...** and choose the file you just downloaded.

## Usage
To convert your Jupyter Notebook (.ipynb) to PDF:

1. **Open** your `.ipynb` file in VS Code.
2. **Click the PDF icon** in the top-right corner of the editor.
<img width="161" height="91" alt="image" src="https://github.com/user-attachments/assets/4367d389-a7e9-408d-9779-50d40de75ed0" />

4. **Wait a moment** – the PDF will be generated in the same folder as your notebook.
