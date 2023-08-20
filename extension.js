const vscode = require('vscode');
const exec = require('child_process').exec;

function activate(context) {

    let uploadDisposable = vscode.commands.registerCommand('myExtension.call_update', function () {
        const token = vscode.workspace.getConfiguration('myExtension').get('token');
        const url = vscode.workspace.getConfiguration('myExtension').get('url');
        const cmd = `curl -H "Authorization: Token ${token}" ${url}/notes/api/update_notes`;

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Error updating notes: ${stderr}`);
            } else {
                vscode.window.showInformationMessage('Notes updated successfully!');
            }
        });
    });
    context.subscriptions.push(uploadDisposable);
}

exports.activate = activate;
