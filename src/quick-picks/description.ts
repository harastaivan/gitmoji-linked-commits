import * as vscode from 'vscode';

export enum DescriptionType {
    Relates,
    Resolves,
    NoDescription,
}

export interface Description {
    label: string;
    value: string;
    type: DescriptionType;
}

const ITEMS = [
    { label: 'Relates', description: 'Relates a task', value: 'Relates: ', type: DescriptionType.Relates },
    { label: 'Resolves', description: 'Resolves a task', value: 'Resolves: ', type: DescriptionType.Resolves },
    {
        label: 'Continue without description',
        description: 'No description will be filled in',
        value: '',
        type: DescriptionType.NoDescription,
    },
];

export const pickDescription = async (): Promise<Description | undefined> => {
    const selected = await vscode.window.showQuickPick(ITEMS, { placeHolder: 'Select description' });

    return selected;
};
