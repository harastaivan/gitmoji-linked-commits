import * as vscode from 'vscode';
import type { GitExtension, Repository } from '../api/git';
import { OUTPUT_TYPE } from '../config';
import type { EmojiWithLabel } from '../quick-picks';

export const getGitExtension = () => {
    const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
};

const getPrefix = (selectedEmoji: EmojiWithLabel) => {
    if (OUTPUT_TYPE === 'emoji') {
        return selectedEmoji.emoji;
    }
    return selectedEmoji.code;
};

export const prefixCommit = async (repository: Repository, selectedEmoji: EmojiWithLabel) => {
    const prefix = getPrefix(selectedEmoji);
    const message = `${prefix} test`;

    try {
        const res = await repository.commit(message);
        vscode.window.showInformationMessage('Success commit');
        return res;
    } catch (err) {
        vscode.window.showErrorMessage(`Unable to commit: ${(err as Error).message}`);
    }
};
