// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "prayer-debugging" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('prayer-debugging.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Almighty God, source of all wisdom and knowledge, I humbly ask, through the intercession of your servant Carlo Acutis, that you grant me clarity and patience in this moment of technical difficulty. You who inspire hearts and minds through your Holy Spirit, guide me to find the solution to this problem I am facing. O Holy Spirit, source of inspiration and wisdom, enlighten my understanding and direct my hands in every line of code, that my work may always be for the greater glory of God and the service of others. Blessed Carlo Acutis, who used technology to draw many to the truth of the Eucharist, pray for me, that I too may use my gifts for good and find the answers I seek with humility and trust. Amen.');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
