import * as vscode from 'vscode';
import type { GitExtension, Ref, Repository } from '../api/git';
import { getEmoji } from '../gitmoji';
import { Description, DescriptionType, EmojiWithLabel } from '../quick-picks';
import { Task } from '../quick-picks/task';

interface CommitMessageOptions {
    emoji: EmojiWithLabel;
    message: string;
    description: Description;
    task?: Task;
}

export const getGitExtension = () => {
    const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension && gitExtension.getAPI(1);
};

const repoCreateCommitMessage = async (repository: Repository, options: CommitMessageOptions) => {
    const { emoji, message, description, task } = options;

    if (description.type === DescriptionType.NoDescription || task?.value === undefined) {
        const commitMessage = `${getEmoji(emoji)} ${message}`;
        repository.inputBox.value = commitMessage;
        return;
    }

    const commitMessage = `${getEmoji(emoji)} ${message}\n\n${description.value}${task.value}`;

    repository.inputBox.value = commitMessage;
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
