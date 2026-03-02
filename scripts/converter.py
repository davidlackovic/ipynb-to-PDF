import nbconvert
import nbformat
import asyncio
import os
import sys
from playwright.async_api import async_playwright

if len(sys.argv) > 1:
    INPUT_FILE = sys.argv[1]

OUTPUT_PDF = os.path.splitext(INPUT_FILE)[0] + ".pdf"
OUTPUT_HTML = os.path.splitext(INPUT_FILE)[0] + "_temp.html"

async def generate_pdf():
    if not os.path.exists(INPUT_FILE):
        print(f"Error: File '{INPUT_FILE}' does not exist.")
        sys.exit(1)

    print(f"Reading notebook: {INPUT_FILE}...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        notebook = nbformat.read(f, as_version=4)

    html_exporter = nbconvert.HTMLExporter()
    
    custom_css = """
    <style>
        body { 
            font-family: sans-serif; 
            padding: 1.5em; 
            line-height: 1.4;
        }


        pre, code, .highlight {
            white-space: pre-wrap !important;
            word-break: normal !important;
            overflow-wrap: break-word !important;
        }


        img {
            display: block !important;
            margin: 1em auto !important;
            

            max-width: 95% !important;
            height: auto !important;
            

            object-fit: contain;
            page-break-inside: avoid !important; /* Slika naj ostane cela */
            page-break-after: auto !important;
            page-break-before: auto !important;
        }


        .jp-Cell, .cell, .jp-Notebook-cell {
            page-break-inside: auto !important;
            break-inside: auto !important;
            margin-bottom: 0.5em !important;
        }


        .jp-InputPrompt, .jp-OutputPrompt { display: none !important; }

        @media print {
            @page {
                margin: 1.5cm;
            }
        }
    </style>
    """


    (body, resources) = html_exporter.from_notebook_node(notebook)

    final_html = body.replace('<head>', f'<head>{custom_css}')

    with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
        f.write(final_html)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        file_path = os.path.abspath(OUTPUT_HTML)
        await page.goto(f"file:///{file_path}")

        await asyncio.sleep(1)
        
        print(f"Creating PDF: {OUTPUT_PDF}...")

        await page.pdf(
            path=OUTPUT_PDF,
            format="A4",
            print_background=True,
            margin={
                "top": "2cm", 
                "bottom": "2cm", 
                "left": "1.5cm", 
                "right": "1.5cm"
            },
            display_header_footer=False
        )
        await browser.close()


    if os.path.exists(OUTPUT_HTML):
        os.remove(OUTPUT_HTML)
        
    print(f"Done! Your PDF is saved in folder!")

if __name__ == "__main__":
    try:
        asyncio.run(generate_pdf())
    except KeyboardInterrupt:
        print("\Stopped by user.")
    except Exception as e:
        print(f"\Error: {e}")