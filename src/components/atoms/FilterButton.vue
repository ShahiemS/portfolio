<script lang="ts" setup>
const { isActive, label } = defineProps(["isActive", "label"]);
</script>

<template>
    <button :class="[
        'px-4 py-2 cursor-pointer rounded-full text-sm border transition-colors duration-200',
        isActive
            ? 'bg-gray-500 text-white border-gray-500'
            : 'border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white hover:border-gray-500'
    ]">
        {{ label }}
    </button>
</template>