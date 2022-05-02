import { ADDITIONAL_EMOJIS, ONLY_USE_ADDITIONAL_EMOJIS, OUTPUT_TYPE } from '../config';
import type { EmojiWithLabel } from '../quick-picks';
import { GITMOJI } from './data';

const getEmojis = () => {
    if (ONLY_USE_ADDITIONAL_EMOJIS === true) {
        return [...ADDITIONAL_EMOJIS];
    }

    return [...GITMOJI, ...ADDITIONAL_EMOJIS];
};

export const getEmoji = (selectedEmoji: EmojiWithLabel) => {
    if (OUTPUT_TYPE === 'emoji') {
        return selectedEmoji.emoji;
    }
    return selectedEmoji.code;
};

export const emojis = getEmojis();
