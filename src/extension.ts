import * as vscode from 'vscode';
import { getGitExtension, prefixCommit } from './git-extension';
import { pickEmoji } from './quick-picks';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.gitmoji-linked-commit', async (uri?) => {
        const git = getGitExtension();
        if (!git) {
            vscode.window.showErrorMessage('Unable to load Git Extension');
            return;
        }

        const emoji = await pickEmoji();
        if (emoji === undefined) {
            return;
        }

        vscode.commands.executeCommand('workbench.view.scm');

        if (uri) {
            const selectedRepository = git.repositories.find((repository) => {
                return repository.rootUri.path === uri._rootUri.path;
            });
            if (selectedRepository) {
                prefixCommit(selectedRepository, emoji);
            }
        } else {
            for (const repo of git.repositories) {
                prefixCommit(repo, emoji);
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
