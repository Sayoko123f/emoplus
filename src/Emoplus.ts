export interface IEmoDataset {
    emojiSet: {
        [key: string]: EmoSet;
    };
    emoteSet: {
        [key: string]: EmoSet;
    };
}

export interface EmoSet {
    id: string;
    label: string;
    items: Item[];
    preview?: null | string;
}

export interface Item {
    label: string;
    link: string;
    preview?: null | string;
}

export type IEmoKey = 'emojiSet' | 'emoteSet';

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

    createSet(id: string, use: IEmoKey = 'emojiSet') {
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

    deleteSet(id: string, use: IEmoKey = 'emojiSet') {
        delete this.dataset[use][id];
    }

    deleteItem(id: string, index: number, use: IEmoKey = 'emojiSet') {
        this.dataset[use][id].items.splice(index, 1);
    }

    pushItem(id: string, items: Item[], use: IEmoKey = 'emojiSet') {
        this.dataset[use][id].items.push(...items);
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
