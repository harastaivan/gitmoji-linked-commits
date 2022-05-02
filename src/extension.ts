import * as vscode from 'vscode';
import { GitExtension, Repository } from './api/git';
import { OUTPUT_TYPE, SHOW_EMOJI_CODE } from './config';
import { emojis } from './gitmoji';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.Gitmoji', (uri?) => {
        const git = getGitExtension();
        const language = getEnvLanguage();

        if (!git) {
            vscode.window.showErrorMessage('Unable to load Git Extension');
            return;
        }

        const items = emojis.map((emojiObj) => {
            const { description, code, emoji } = emojiObj;
            const displayCode = SHOW_EMOJI_CODE ? code : '';
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

                if (uri) {
                    let selectedRepository = git.repositories.find((repository) => {
                        return repository.rootUri.path === uri._rootUri.path;
                    });
                    if (selectedRepository) {
                        if (OUTPUT_TYPE === 'emoji') {
                            prefixCommit(selectedRepository, selected.emoji);
                        } else {
                            prefixCommit(selectedRepository, selected.code);
                        }
                    }
                } else {
                    for (let repo of git.repositories) {
                        if (OUTPUT_TYPE === 'emoji') {
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
