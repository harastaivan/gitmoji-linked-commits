import * as vscode from 'vscode';
import type { GitExtension, Repository } from '../api/git';
import { getEmoji } from '../gitmoji';
import type { EmojiWithLabel } from '../quick-picks';

interface CommitMessageOptions {
    emoji: EmojiWithLabel;
}

export const getGitExtension = () => {
    const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
};

const repoCreateCommitMessage = async (repository: Repository, options: CommitMessageOptions) => {
    const { emoji } = options;
    const message = `${getEmoji(emoji)}`;

    repository.inputBox.value = message;
};

export const createCommitMessage = (options: CommitMessageOptions, uri?: any) => {
    const git = getGitExtension();
    if (!git) {
        return;
    }

    if (uri) {
        const selectedRepository = git.repositories.find((repository) => {
            return repository.rootUri.path === uri._rootUri.path;
        });
        if (selectedRepository) {
            repoCreateCommitMessage(selectedRepository, options);
        }
    } else {
        for (const repo of git.repositories) {
            repoCreateCommitMessage(repo, options);
        }
    }
};
