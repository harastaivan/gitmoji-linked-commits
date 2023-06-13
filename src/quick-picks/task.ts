import * as vscode from 'vscode';
import { getGitExtension } from '../git-extension';
import { sortBranches, selectBranches } from '../git-extension/branches';
import { BRANCH_TASK_PATTERN } from '../config';

const FALLBACK: Task = {
    value: '',
    label: 'Fill in custom number',
    description: "Number isn't from branch in the list",
    alwaysShow: true,
};

export interface Task {
    value: string;
    label: string;
    description?: string;
    alwaysShow: boolean;
}

export const pickTask = async (): Promise<Task | undefined> => {
    const git = getGitExtension();
    if (git === undefined) {
        return;
    }

    const branches = (await selectBranches()) || [];
    const orderedBranches = sortBranches(branches);

    const items = orderedBranches
        ?.map((branch): Task | null => {
            const match = branch.name?.match(BRANCH_TASK_PATTERN);

            if (!match || match.length === 0) return null;

            return {
                value: `#${match[1]}`,
                label: match[1],
                description: `Pick from ${branch.name}`,
                alwaysShow: branch.isCurrent,
            };
        })
        .filter((branch) => branch !== null) as Task[];

    const selected = await vscode.window.showQuickPick([...items, FALLBACK], { placeHolder: 'Select task number' });

    return selected;
};
