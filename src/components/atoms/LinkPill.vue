<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
    href?: string;
    icon?: any;
    class?: string;
}>();

const mergedClasses = computed(() =>
    [
        "inline-flex text-white items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40",
        props.class,
    ]
        .filter(Boolean)
        .join(" ")
);
</script>

<template>
    <a :href="props.href" :class="mergedClasses" target="_blank" rel="noreferrer noopener">
        <component :is="props.icon" class="w-4 h-4" />
        <span>
            <slot />
        </span>
    </a>
</template>
