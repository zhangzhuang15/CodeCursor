import * as vscode from "vscode";

export function getOpenedTab(uri: vscode.Uri): vscode.Tab | null {
    const targetUriString = uri.toString();
    const tabGroups = vscode.window.tabGroups;
    for (const tabGroup of tabGroups.all) {
        for (const tab of tabGroup.tabs) {
            const tabInput = tab.input;
            if (!(tabInput instanceof vscode.TabInputTextDiff)) {
                continue;
            }
            if (tabInput.modified.toString() === targetUriString) {
                return tab;
            }
        }
    }

    return null;
}

export function getNonce() {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

type CustomModelConfiguration = {
    openaiAPIKey: string;
    model: string;
};

export function getCustomModelConfiguration(): CustomModelConfiguration | null {
    const config = vscode.workspace.getConfiguration("aicursor");
    const apiKey = config.get("openaiApiKey", "");
    const model = config.get("model", "");
    if (apiKey === "") {
        return null;
    }
    return {
        openaiAPIKey: apiKey,
        model,
    };
}
