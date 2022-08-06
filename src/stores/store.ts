import { defineStore } from 'pinia';
import { Emoplus } from '../Emoplus';

export const useStore = defineStore('main', {
    state: () => ({
        Emop: new Emoplus(),
    }),
});
