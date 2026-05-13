import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('ipynb-to-pdf.convert', () => {
        
        const activeNotebook = vscode.window.activeNotebookEditor;
        let fullPath: string | undefined;

        if (activeNotebook) {
            fullPath = activeNotebook.notebook.uri.fsPath;
        } else {
            fullPath = vscode.window.activeTextEditor?.document.fileName;
        }

        if (!fullPath || !fullPath.endsWith('.ipynb')) {
            vscode.window.showErrorMessage('Error: Please open a Jupyter Notebook (.ipynb) to convert it.');
            return;
        }

        // --- KLJUČNI POPRAVEK ZA ŠUMNIKE ---
        const directory = path.dirname(fullPath);
        const fileName = path.basename(fullPath);
        const scriptPath = path.join(context.extensionPath, 'scripts', 'converter.py');

        vscode.window.showInformationMessage(`Converting: ${fileName}...`);

        // Uporabimo { cwd: directory }, da Python teče znotraj mape z zvezkom
        // scriptPath še vedno pustimo polno pot, ker je v mapi extensiona (kjer običajno ni šumnikov)
        exec(`python "${scriptPath}" "${fileName}"`, { cwd: directory }, (error, stdout, stderr) => {
            if (error) {
                // Če Python vrne napako, jo izpišemo tukaj
                vscode.window.showErrorMessage(`Execution error: ${error.message}`);
                console.error("Stderr:", stderr);
                console.error("Stdout:", stdout);
                return;
            }
            vscode.window.showInformationMessage('PDF created successfully!');
        });
    });

    context.subscriptions.push(disposable);
}