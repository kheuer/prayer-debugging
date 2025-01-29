import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "prayer-debugging" is now active!');

    const disposable = vscode.commands.registerCommand('prayer-debugging.pray', () => {
        const panel = vscode.window.createWebviewPanel(
            'imageViewer', // Identifies the type of the webview. Used internally
            'Image Viewer', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {} // Webview options
        );

        // Get the path to the image file
        const imagePath = vscode.Uri.file(
            path.join(context.extensionPath, 'carlo_acutis.jpeg')
        );

        // Convert the image path to a webview accessible URI
        const imageUri = panel.webview.asWebviewUri(imagePath);

        // Set the HTML content for the webview
        panel.webview.html = getWebviewContent(imageUri);
    });

    context.subscriptions.push(disposable);
}



export function deactivate() { }

function getWebviewContent(imageUri: vscode.Uri) {
    // Create the HTML content to be displayed in the webview
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blessed Carlo Acutis Prayer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FAF3E0;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        img {
            max-width: 100%;
            border-radius: 10px;
        }
        h2 {
            color: #444;
        }
        p {
            font-style: italic;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="${imageUri}" alt="Blessed Carlo Acutis" />
        <h2>Blessed Carlo Acutis</h2>
        <p>Almighty God, source of all wisdom and knowledge, I humbly ask, through the intercession of your servant Carlo Acutis, that you grant me clarity and patience in this moment of technical difficulty.</p>
        <p>You who inspire hearts and minds through your Holy Spirit, guide me to find the solution to this problem I am facing.</p>
        <p>O Holy Spirit, source of inspiration and wisdom, enlighten my understanding and direct my hands in every line of code, that my work may always be for the greater glory of God and the service of others.</p>
        <p>Blessed Carlo Acutis, who used technology to draw many to the truth of the Eucharist, pray for me, that I too may use my gifts for good and find the answers I seek with humility and trust.</p>
        <p>Amen.</p>
    </div>
</body>
</html>
`;
}
