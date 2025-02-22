import * as vscode from 'vscode';
import * as path from 'path';
import { listeners } from 'process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "prayer-debugging" is now active!');

    // Register the 'pray' command
    const prayCommand = vscode.commands.registerCommand('prayer-debugging.pray', () => {
        const panel = vscode.window.createWebviewPanel(
            'prayerViewer', // Unique webview identifier
            'Prayer', // Title of the panel
            vscode.ViewColumn.One, // Show in column one
            {} // Webview options
        );

        // Get the path to the image file
        const imagePath = vscode.Uri.file(
            path.join(context.extensionPath, 'carlo_acutis.jpeg')
        );

        // Convert the image path to a webview accessible URI
        const imageUri = panel.webview.asWebviewUri(imagePath);

        // Get the configured language
        const config = vscode.workspace.getConfiguration('prayer-debugging');
        const language = config.get<string>('language') || 'en';
        console.log("language " + language + JSON.stringify(config));

        // Set the HTML content for the webview
        panel.webview.html = getWebviewContent(imageUri, language);
    });

    context.subscriptions.push(prayCommand);

    vscode.debug.onDidStartDebugSession((session) => {
        askForPrayer(context);
    });

    vscode.debug.onDidTerminateDebugSession((session) => {
        askForPrayer(context);
    });

    vscode.window.onDidEndTerminalShellExecution((terminal) => {
        console.log("onDidEndTerminalShellExecution " + terminal.exitCode);
        if (terminal.exitCode !== 0) {
            askForPrayer(context);
        }
    });


    // Error handling and notification logic
    const errorTimestamps = new Map();
    vscode.languages.onDidChangeDiagnostics(event => {
        const errors = vscode.languages.getDiagnostics();
        const now = Date.now();

        errors.forEach(([uri, diagnostics]) => {
            diagnostics.forEach(diagnostic => {
                if (diagnostic.severity === vscode.DiagnosticSeverity.Error) {
                    const key = `${uri.toString()}_${diagnostic.message}`;

                    if (!errorTimestamps.has(key)) {
                        errorTimestamps.set(key, now);
                        setTimeout(() => {
                            const persistedTime = errorTimestamps.get(key);
                            if (persistedTime && Date.now() - persistedTime >= 5000) {
                                askForPrayer(context);
                            }
                        }, 5000);
                    }
                }
            });
        });

        // Clean up resolved errors
        errorTimestamps.forEach((timestamp, key) => {
            const stillExists = errors.some(([uri, diagnostics]) =>
                diagnostics.some(d => key === `${uri.toString()}_${d.message}`)
            );
            if (!stillExists) {
                errorTimestamps.delete(key);
            }
        });
    });
}

// function to deactivate the extension
export function deactivate() { }

let lastAsked: number = 0;
let timeoutSeconds: number = 10;

export function askForPrayer(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('prayer-debugging');
    const language = config.get<string>('language');

    const now = Date.now();
    if (now - lastAsked < timeoutSeconds * 1000) {
        return; // Avoid flooding the user with notifications
    }
    lastAsked = now;

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBarItem.text = getPrayerPrompt(language);
    statusBarItem.command = 'prayer-debugging.pray';
    statusBarItem.tooltip = getPrayerPrompt(language);

    // Show and auto-hide the status bar message
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    setTimeout(() => {
        statusBarItem.hide();
    }, timeoutSeconds * 1000);
}

// Function to get the prayer prompt based on selected language
function getPrayerPrompt(language: string): string {
    const prompts = {
        en: '🙏 Click here to pray for debugging!',
        de: '🙏 Klicken Sie hier, um für das Debugging zu beten!',
        es: '🙏 ¡Haga clic aquí para orar por la depuración!'
    };

    return prompts[language] || prompts.en; // Default to English if not found
}

// Function to return prayer text based on selected language
function getPrayerText(language: string): string {
    const prayers = {
        en: `
        Almighty God, source of all wisdom and knowledge, I humbly ask, 
        through the intercession of your servant Carlo Acutis, that you 
        grant me clarity and patience in this moment of technical difficulty.
        You who inspire hearts and minds through your Holy Spirit, 
        guide me to find the solution to this problem I am facing.
        O Holy Spirit, source of inspiration and wisdom, enlighten my understanding 
        and direct my hands in every line of code, that my work may always be 
        for the greater glory of God and the service of others.
        Blessed Carlo Acutis, who used technology to draw many to the truth of the Eucharist, 
        pray for me, that I too may use my gifts for good and find the answers I seek with humility and trust.
        Amen.
        `,
        de: `
        Allmächtiger Gott, Quelle aller Weisheit und Erkenntnis, ich bitte demütig, 
        durch die Fürsprache deines Dieners Carlo Acutis, 
        dass du mir Klarheit und Geduld in diesem Moment der technischen Schwierigkeiten schenkst. 
        Du, der du Herzen und Gedanken durch deinen Heiligen Geist inspirierst, 
        führe mich dahin, die Lösung für dieses Problem zu finden dem ich gegenüberstehe.
        O Heiliger Geist, Quelle der Inspiration und Weisheit, erleuchte mein Verständnis 
        und leite meine Hände in jeder Zeile meines Codes, 
        damit mein Werk immer zur größeren Ehre Gottes und zum Dienst an anderen ist.
        Seliger Carlo Acutis, der du Technologie verwendet hat, um viele zur Wahrheit der Eucharistie zu ziehen, 
        bete für mich, dass ich auch meine Gaben zum Guten nutzen kann und 
        die Antworten finde, die ich mit Demut und Vertrauen suche.
        Amen.
        `,
        es: `
        Dios Todopoderoso, fuente de toda sabiduría y conocimiento, te
        pido humildemente, por la intercesión de tu siervo Carlo
        Acutis, que me concedas claridad y paciencia en este momento
        de dificultad técnica.
        Tú que inspiras a los corazones y mentes con tu Espíritu Santo,
        guíame para encontrar la solución a este problema informático
        que enfrento.
        Oh Espíritu Santo, fuente de inspiración y sabiduría, ilumina mi
        entendimiento y dirige mis manos en cada línea de código, que
        mi trabajo sea siempre para mayor gloria de Dios y servicio a
        los demás.
        Beato Carlo Acutis, tú que usaste la tecnología para acercar a
        muchos a la verdad de la Eucaristía, ruega por mí, para que
        también pueda utilizar mis dones para el bien, y encontrar la
        respuesta que busco con humildad y confianza.
        Amén.
        `
    };

    return prayers[language] || prayers.en; // Default to English if not found
}
// function to get the tab title depending on the language
function getTabTitle(language: string): string {
    const titles = {
        en: "Blessed Carlo Acutis",
        de: "Gesegneter Carlo Acutis",
        es: "Beato Carlo Acutis"
    };

    return titles[language] || titles.en; // Default to English if not found
}

// Function to set content for the webview
function getWebviewContent(imageUri: vscode.Uri, language: string) {
    const prayerText = getPrayerText(language);
    const tabTitle = getTabTitle(language);

    return `<!DOCTYPE html>
<html lang="${language}">
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
        <img src="${imageUri}" alt="" height="300"/>
        <h2>${tabTitle}</h2>
        <p>${prayerText}</p>
    </div>
</body>
</html>
`;
}
