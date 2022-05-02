import * as vscode from 'vscode';
import { createCommitMessage, getGitExtension } from './git-extension';
import { pickEmoji, getMessage, pickDescription } from './quick-picks';
import { pickTask } from './quick-picks/task';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.gitmoji-linked-commit', async (uri) => {
        const git = getGitExtension();
        if (!git) {
            vscode.window.showErrorMessage('Unable to load Git Extension');
            return;
        }

        const emoji = await pickEmoji();
        if (emoji === undefined) {
            return;
        }

        const message = await getMessage();
        if (message === undefined) {
            return;
        }

        const description = await pickDescription();
        if (description === undefined) {
            return;
        }

        const task = await pickTask();
        if (task === undefined) {
            return;
        }

        vscode.commands.executeCommand('workbench.view.scm');

        createCommitMessage({ emoji, message, description, task }, uri);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
