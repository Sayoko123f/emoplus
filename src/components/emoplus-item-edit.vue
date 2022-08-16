<template>
    <section class="flex flex-col">
        <div class="flex flex-col">
            <label for="edit-title">圖片標題*</label>
            <input
                class="form-input"
                id="edit-title"
                type="text"
                v-model="editItem.label"
            />
        </div>
        <div class="mt-4 flex flex-col">
            <label for="edit-link">實際連結*</label>
            <input
                class="form-input"
                id="edit-link"
                type="text"
                v-model="editItem.link"
            />
        </div>

        <div class="mt-4 flex flex-col">
            <div class="flex gap-2">
                <label for="edit-preview">預覽連結</label>
                <div class="text-sm">
                    <input
                        class="form-checkbox"
                        id="edit-title-preview"
                        type="checkbox"
                        v-model="isLabelPreview"
                        @change="onLabelPreviewCheckboxChange"
                    />
                    <label for="edit-title-preview">使用標題預覽</label>
                </div>
            </div>
            <input
                v-show="!isLabelPreview"
                class="form-input"
                id="edit-preview"
                type="text"
                v-model="editItem.preview"
            />
        </div>
        <div class="mt-4 grid grid-cols-2 border-t border-b">
            <div class="">
                <p>測試預覽</p>
                <p v-if="editItem.preview === '!label'">{{ editItem.label }}</p>
                <img
                    v-else
                    class="max-h-64"
                    :src="editItem.preview ? editItem.preview as string:editItem.link"
                    alt="圖片載入失敗"
                />
            </div>
            <div class="">
                <p>測試實際連結</p>
                <img class="max-h-64" :src="editItem.link" alt="圖片載入失敗" />
            </div>
        </div>
        <div class="mt-4 flex justify-end gap-4">
            <button
                class="rounded py-1 px-4 font-bold shadow-md"
                @click="() => prop.close()"
            >
                取消
            </button>
            <button
                class="rounded bg-blue-700 py-1 px-4 font-bold text-white shadow-md hover:bg-blue-500"
                @click.stop="saveData"
            >
                <PencilIcon class="inline-block h-6 w-6 align-top" />
                保存
            </button>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { useStore } from '../stores/store';
import { IEmoKey, Item } from '../Emoplus';
import { PencilIcon } from '@heroicons/vue/solid';
import { reactive, onMounted, ref } from 'vue';
interface Prop {
    use: IEmoKey;
    id: string;
    index?: number;
    close: Function;
}
const prop = defineProps<Prop>();

const store = useStore();
const Emop = store.Emop;
const set = Emop.dataset[prop.use][prop.id];
const isLabelPreview = ref(false);
const editItem = reactive<Item>({ label: '', link: '', preview: '' });
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

function onLabelPreviewCheckboxChange(event: Event) {
    if (!event.target) {
        return;
    }
    const { checked } = event.target as HTMLInputElement;
    if (checked) {
        editItem.preview = '!label';
    } else {
        editItem.preview = '';
    }
}

function saveData() {
    if (prop.index !== undefined) {
        const refItem = set.items[prop.index];
        refItem.label = editItem.label;
        refItem.link = editItem.link;
        refItem.preview = editItem.preview;
    } else {
        set.items.push(editItem);
    }
    prop.close();
}
</script>
