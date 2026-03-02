import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('ipynb-to-pdf.convert', () => {
        
        // POSODOBLJENO: Preverimo najprej Notebook Editor (za .ipynb)
        const activeNotebook = vscode.window.activeNotebookEditor;
        let filePath: string | undefined;

        if (activeNotebook) {
            filePath = activeNotebook.notebook.uri.fsPath;
        } else {
            // Rezerva za navadne editorje
            filePath = vscode.window.activeTextEditor?.document.fileName;
        }

        if (!filePath || !filePath.endsWith('.ipynb')) {
            vscode.window.showErrorMessage('Napaka: Odpri Jupyter zvezek (.ipynb), da ga lahko pretvoriš.');
            return;
        }

        const scriptPath = path.join(context.extensionPath, 'scripts', 'converter.py');
        vscode.window.showInformationMessage(`Pretvarjam: ${path.basename(filePath)}...`);

        exec(`python "${scriptPath}" "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Napaka pri izvajanju: ${error.message}`);
                console.error(stderr);
                return;
            }
            vscode.window.showInformationMessage('PDF uspešno ustvarjen!');
        });
    });

    context.subscriptions.push(disposable);
}