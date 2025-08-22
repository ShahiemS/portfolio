<script setup lang="ts">
import { computed } from "vue";
import { useLanguageStore } from "@/stores/language";

type Lang = "en" | "nl";
type Labels = {
    rights: string;
};

const labels: Record<Lang, Labels> = {
    en: {
        rights: "All rights reserved.",
    },
    nl: {
        rights: "Alle rechten voorbehouden.",
    },
};

const languageStore = useLanguageStore();
const t = computed<Labels>(() => labels[languageStore.lang]);
</script>

<template>
    <footer class="relative z-10 mx-auto px-6 text-sm/6 text-white/70">
        &copy; {{ new Date().getFullYear() }} Shahiem Seymor. {{ t.rights }}
    </footer>
</template>
