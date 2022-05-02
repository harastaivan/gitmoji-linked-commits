import { ADDITIONAL_EMOJIS, ONLY_USE_ADDITIONAL_EMOJIS } from '../config';
import { GITMOJI } from './data';

const getEmojis = () => {
    if (ONLY_USE_ADDITIONAL_EMOJIS === true) {
        return [...ADDITIONAL_EMOJIS];
    }

    return [...GITMOJI, ...ADDITIONAL_EMOJIS];
};

export const emojis = getEmojis();
