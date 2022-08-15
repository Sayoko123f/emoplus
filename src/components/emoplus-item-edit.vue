<template>
    <section class="flex flex-col">
        <div>
            <label for="edit-title">圖片標題* </label>
            <input id="edit-title" type="text" v-model="editItem.label" />
        </div>
        <div class="">
            <input
                id="edit-title-preview"
                type="checkbox"
                v-model="isLabelPreview"
            />
            <label for="edit-title-preview"> 使用標題預覽 </label>
        </div>
        <div class="">
            <label for="edit-preview">預覽連結 </label>
            <input id="edit-preview" type="text" v-model="editItem.preview" />
        </div>
        <div class="">
            <label for="edit-link">實際連結* </label>
            <input id="edit-link" type="text" v-model="editItem.link" />
        </div>
        <div class="">
            <img :src="editItem.link" alt="圖片載入失敗" />
        </div>
    </section>
</template>
<script lang="ts" setup>
import { useStore } from '../stores/store';
import { IEmoKey, Item } from '../Emoplus';
import { TrashIcon, PencilIcon } from '@heroicons/vue/solid';
import { reactive, onMounted, ref } from 'vue';
interface Prop {
    use: IEmoKey;
    id: string;
    index?: number;
}
const prop = defineProps<Prop>();

const store = useStore();
const Emop = store.Emop;
const set = Emop.dataset[prop.use][prop.id];
const isLabelPreview = ref(false);
const editItem = reactive<Item>({ label: '', link: '' });
onMounted(() => {
    if (prop.index !== undefined) {
        const refItem = set.items[prop.index];
        editItem.label = refItem.label;
        editItem.link = refItem.link;
        if (refItem.preview) {
            editItem.preview = refItem.preview;
            if (refItem.preview === '!label') {
                isLabelPreview.value = true;
            }
        }
    }
});
</script>
