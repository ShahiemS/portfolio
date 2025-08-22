<script lang="ts" setup>
import { ChevronUp } from "lucide-vue-next";
import LinkPill from "../atoms/LinkPill.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useLanguageStore } from "@/stores/language";

// types + labels
type Lang = "en" | "nl";
type Labels = {
    backToTop: string;
    backToTopAria: string;
};

const labels: Record<Lang, Labels> = {
    en: {
        backToTop: "Back to top",
        backToTopAria: "Scroll back to top",
    },
    nl: {
        backToTop: "Naar boven",
        backToTopAria: "Scroll terug naar boven",
    },
};

const languageStore = useLanguageStore();
const t = computed<Labels>(() => labels[languageStore.lang]);

// existing logic
const showButton = ref(false);

const handleScroll = () => {
    showButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <Transition name="fade-slide">
        <div v-if="showButton" class="fixed right-9 bottom-9">
            <LinkPill as="button" class="cursor-pointer" @click="scrollToTop" :icon="ChevronUp"
                :aria-label="t.backToTopAria">
                {{ t.backToTop }}
            </LinkPill>
        </div>
    </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
