<template>
    <div
        class="fixed inset-0 flex justify-center bg-black bg-opacity-60"
        @click.self="close"
    >
        <div class="rounded bg-white p-4 shadow-md max-w-2xl my-8 w-full overflow-y-auto">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['close']);

function close() {
    emit('close');
}
</script>
