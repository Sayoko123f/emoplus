export interface IEmoDataset {
    emojiSet: {
        [key: string]: EmoSet;
    };
    emoteSet: {
        [key: string]: EmoSet;
    };
}

interface EmoSet {
    id: string;
    label: string;
    items: Item[];
    preview?: null | string;
}

interface Item {
    label: string;
    link: string;
    preview?: null | string;
}

type EmoKey = 'emojiSet' | 'emoteSet';

export class Emoplus {
    dataset: IEmoDataset;

    constructor() {
        this.dataset = this.getDefaultDataset();
    }

    loadEmoDataset(src: IEmoDataset) {
        for (const key of Object.keys(src)) {
            if (key === 'emojiSet' || key === 'emoteSet') {
                for (const [k, v] of Object.entries(src[key])) {
                    if (k in this.dataset[key]) {
                        this.dataset[key][k].items.push(...v.items);
                    } else {
                        this.dataset[key][k] = v;
                    }
                }
            }
        }
    }

    getDefaultDataset() {
        return {
            emojiSet: {},
            emoteSet: {},
        };
    }

    getDatasetJSON() {
        return JSON.stringify(this.dataset);
    }

    createSet(id: string, use: EmoKey = 'emojiSet') {
        // 如果已經有相同 id 的分類就不動作
        if (id in this.dataset[use]) {
            return;
        }
        this.dataset[use][id] = {
            id,
            label: '',
            items: [],
        };
    }

    deleteSet(id: string, use: EmoKey = 'emojiSet') {
        delete this.dataset[use][id];
    }
}

export function loadEmoHack(mod: any): IEmoDataset {
    const keys = ['emojiSet', 'emoteSet'];
    for (const key of keys) {
        if (!(key in mod)) {
            mod[key] = {};
        }
    }
    return mod as IEmoDataset;
}