<template>
    <div class="">
        <h2>
            {{ prop.use === 'emojiSet' ? '表情符號' : '貼圖' }}
        </h2>
        <div v-for="(obj, id) in prop.set">
            <h3 class="font-bold">{{ obj.label }}</h3>
            <span>({{ obj.items.length }})</span>
            <div class="flex flex-wrap">
                <div
                    class="group relative flex h-[128px] w-[128px] items-center justify-center rounded"
                    v-for="(item, i) in obj.items"
                >
                    <!-- Edit button -->
                    <div
                        class="absolute inset-0 hidden flex-col gap-2 rounded bg-black bg-opacity-60 p-2 font-bold text-white group-hover:flex"
                    >
                        <button
                            class="w-full rounded bg-white bg-opacity-80 py-1 text-blue-600"
                            @click.stop="()=>openEditPannel(id as string,i)"
                        >
                            <PencilIcon
                                class="inline-block h-6 w-6 align-top"
                            />
                            編輯
                        </button>
                        <button
                            class="w-full rounded bg-white bg-opacity-80 py-1 text-red-600"
                            @click.stop="() => Emop.deleteItem(id as string,i,prop.use)"
                        >
                            <TrashIcon class="inline-block h-6 w-6 align-top" />
                            刪除
                        </button>
                    </div>
                    <div
                        :class="[
                            prop.use === 'emojiSet' ? 'w-8' : 'w-[120px]',
                            prop.use === 'emojiSet' ? 'h-8' : 'h-[120px]',
                        ]"
                    >
                        <span v-if="item.preview === '!label'">{{
                            item.label
                        }}</span>
                        <img
                            class="max-h-full object-cover object-center"
                            v-else
                            :src="item.link"
                            :title="item.label"
                            :alt="item.label"
                        />
                    </div>
                </div>
            </div>
        </div>
        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <OverlayModal v-if="editPannel.open" @close="closeEditPannel">
                <EmoplusItemEdit
                    :use="prop.use"
                    :id="editPannel.id"
                    :index="editPannel.index"
                />
            </OverlayModal>
        </Transition>
    </div>
</template>
<script lang="ts" setup>
import { useStore } from '../stores/store';
import { IEmoDataset, IEmoKey } from '../Emoplus';
import { TrashIcon, PencilIcon } from '@heroicons/vue/solid';
import OverlayModal from './overlay-modal.vue';
import { reactive } from 'vue';
import EmoplusItemEdit from './emoplus-item-edit.vue';
interface Prop {
    use: IEmoKey;
    set: IEmoDataset['emojiSet'] | IEmoDataset['emoteSet'];
}
const prop = defineProps<Prop>();

const store = useStore();
const Emop = store.Emop;
const editPannel = reactive({
    open: false,
    id: '',
    index: undefined as number | undefined,
});

function openEditPannel(id: string, index?: number) {
    editPannel.id = id;
    editPannel.index = index;
    editPannel.open = true;
}

function closeEditPannel() {
    editPannel.open = false;
}
</script>
