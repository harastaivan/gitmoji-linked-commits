import * as vscode from 'vscode';

const validateMessage = (message: string) => {
    if (!message) {
        return 'Message cannot be empty';
    }

    return null;
};

export const getMessage = async (): Promise<string | undefined> => {
    const message = await vscode.window.showInputBox({ placeHolder: 'Commit message', validateInput: validateMessage });

    return message;
};
