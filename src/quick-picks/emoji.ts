import * as vscode from 'vscode';

import { SHOW_EMOJI_CODE } from '../config';
import { emojis } from '../gitmoji';
import type { Emoji } from '../gitmoji/data';

export interface EmojiWithLabel extends Omit<Emoji, 'description'> {
    label: string;
}

export const pickEmoji = async (): Promise<EmojiWithLabel | undefined> => {
    const items = emojis.map(({ description, code, emoji }) => {
        const displayCode = SHOW_EMOJI_CODE ? code : '';
        const label = `${emoji} ${description} ${displayCode}`;
        return {
            label,
            code,
            emoji,
        };
    });

    const selected = await vscode.window.showQuickPick(items, { placeHolder: 'Search for gitmoji' });

    return selected;
};
