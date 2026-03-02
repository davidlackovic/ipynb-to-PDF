import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('ipynb-to-pdf.convert', () => {
        
        // CHECK: Get the active Notebook Editor (for .ipynb files)
        const activeNotebook = vscode.window.activeNotebookEditor;
        let filePath: string | undefined;

        if (activeNotebook) {
            filePath = activeNotebook.notebook.uri.fsPath;
        } else {
            // Fallback for regular text editors
            filePath = vscode.window.activeTextEditor?.document.fileName;
        }

        if (!filePath || !filePath.endsWith('.ipynb')) {
            vscode.window.showErrorMessage('Error: Please open a Jupyter Notebook (.ipynb) to convert it.');
            return;
        }

        const scriptPath = path.join(context.extensionPath, 'scripts', 'converter.py');
        vscode.window.showInformationMessage(`Converting: ${path.basename(filePath)}...`);

        exec(`python "${scriptPath}" "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Execution error: ${error.message}`);
                console.error(stderr);
                return;
            }
            vscode.window.showInformationMessage('PDF created successfully!');
        });
    });

    context.subscriptions.push(disposable);
}