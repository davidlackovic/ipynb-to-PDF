# Change Log

All changes to "ipynb-to-PDF" will be noted here.
David Lackovič, 2026

## [0.1.0] - 13. 5. 2026
### Fixed
- **Support for Special Characters:** Fixed a critical bug where conversion failed if file paths contained characters like č, š, ž.
- **Improved Path Handling:** Implemented `cwd` execution strategy to ensure robust file access across different operating systems.

### Added
- **Extension Icon:** Added a new modern 128x128 icon for better visibility in the VS Code sidebar.
- **URL Encoding:** Added safe URL parsing for Playwright to handle non-ASCII characters in temp files.

## [0.0.2] - 2. 3. 2026
### Fixed
- Fixed printing updates in terminal during execution (cleaner output).

## [0.0.1] - 2. 3. 2026
### Added
- Initial release of the extension.
- Integrated PDF conversion button in the editor title bar for Jupyter Notebooks.
- Python script integration using `nbconvert` and `playwright`.
- Support for automated PDF generation from .ipynb files.
