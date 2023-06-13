import { workspace } from 'vscode';
import type { Emoji } from '../gitmoji/data';

enum OutputType {
    EMOJI = 'emoji',
    CODE = 'code',
}

export const BRANCH_TASK_PATTERN: string =
    workspace.getConfiguration().get('gitmoji-linked-commits.branchTaskPattern') || '[a-zA-Z]+/(\\d+)-.*';

export const ADDITIONAL_EMOJIS: Array<Emoji> =
    workspace.getConfiguration().get('gitmoji-linked-commits.additionalEmojis') || [];

export const ONLY_USE_ADDITIONAL_EMOJIS: boolean =
    workspace.getConfiguration().get('gitmoji-linked-commits.onlyUseAdditionalEmojis') || false;

export const SHOW_EMOJI_CODE: boolean =
    workspace.getConfiguration().get('gitmoji-linked-commits.showEmojiCode') || false;

export const OUTPUT_TYPE: OutputType =
    workspace.getConfiguration().get('gitmoji-linked-commits.outputType') || OutputType.EMOJI;
