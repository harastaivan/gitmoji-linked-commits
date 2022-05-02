import * as vscode from 'vscode';
import { GitExtension, Repository } from './api/git';
import Gitmoji from './gitmoji/gitmoji';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.Gitmoji', (uri?) => {
        const git = getGitExtension();
        const language = getEnvLanguage();

        if (!git) {
            vscode.window.showErrorMessage('Unable to load Git Extension');
            return;
        }

        let additionalEmojis: Array<any> = vscode.workspace.getConfiguration().get('gitmoji.additionalEmojis') || [];

        const showEmojiCode: boolean | undefined = vscode.workspace.getConfiguration().get('gitmoji.showEmojiCode');

        let emojis = [];
        let onlyUseAdditionalEmojis: boolean | undefined = vscode.workspace
            .getConfiguration()
            .get('gitmoji.onlyUseAdditionalEmojis');

        if (onlyUseAdditionalEmojis === true) {
            emojis = [...additionalEmojis];
        } else {
            emojis = [...Gitmoji, ...additionalEmojis];
        }

        const items = emojis.map((emojiObj) => {
            const { description, code, emoji } = emojiObj;
            const displayCode = showEmojiCode ? code : '';
            const label = `${emoji} ${description} ${displayCode}`;
            return {
                label,
                code,
                emoji,
            };
        });

        vscode.window.showQuickPick(items).then(function (selected) {
            if (selected) {
                vscode.commands.executeCommand('workbench.view.scm');
                let outputType = vscode.workspace.getConfiguration().get('gitmoji.outputType');

                if (uri) {
                    let selectedRepository = git.repositories.find((repository) => {
                        return repository.rootUri.path === uri._rootUri.path;
                    });
                    if (selectedRepository) {
                        if (outputType === 'emoji') {
                            prefixCommit(selectedRepository, selected.emoji);
                        } else {
                            prefixCommit(selectedRepository, selected.code);
                        }
                    }
                } else {
                    for (let repo of git.repositories) {
                        if (outputType === 'emoji') {
                            prefixCommit(repo, selected.emoji);
                        } else {
                            prefixCommit(repo, selected.code);
                        }
                    }
                }
            }
        });
    });

    context.subscriptions.push(disposable);
}

function getEnvLanguage() {
    const language = vscode.env.language;
    return language;
}

function prefixCommit(repository: Repository, prefix: String) {
    repository.inputBox.value = `${prefix} ${repository.inputBox.value}`;
}

function getGitExtension() {
    const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
}

export function deactivate() {}
