<template>
    <div class="flex items-center">
        <div role="tablist" aria-label="Language"
            class="relative inline-flex items-center bg-black/40 border border-white/20 rounded overflow-hidden select-none h-9 p-1">
            <!-- gooey-ish layer (under text) -->
            <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
                <!-- leader: main pill that moves -->
                <span class="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.5rem)]
                   rounded bg-white will-change-transform
                   transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" :class="languageStore.lang === 'nl'
                    ? 'translate-x-[calc(100%+0.5rem)]'
                    : 'translate-x-0'">
                    <!-- inner core: re-mounted per side to retrigger the squish animation -->
                    <span :key="languageStore.lang" class="block h-full w-full rounded"
                        style="animation: squish 500ms cubic-bezier(0.22,1,0.36,1)" />
                </span>

                <!-- trail: softer, slightly larger, slower for a liquid feel -->
                <span class="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.5rem)]
                   rounded bg-white/90 blur-[1.5px] will-change-transform
                   transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.03]" :class="languageStore.lang === 'nl'
                    ? 'translate-x-[calc(100%+0.5rem)]'
                    : 'translate-x-0'" />
            </div>

            <!-- EN -->
            <button role="tab" :aria-selected="languageStore.lang === 'en'" @click="languageStore.setLang('en')" class="relative z-10 px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-white/50" :class="languageStore.lang === 'en'
                    ? 'text-black'
                    : 'text-white/80 hover:text-white cursor-pointer'">
                EN
            </button>

            <!-- NL -->
            <button role="tab" :aria-selected="languageStore.lang === 'nl'" @click="languageStore.setLang('nl')" class="relative z-10 px-3 py-1.5 text-xs font-medium rounded-md transition-colors focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-white/50" :class="languageStore.lang === 'nl'
                    ? 'text-black'
                    : 'text-white/80 hover:text-white cursor-pointer'">
                NL
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLanguageStore } from "@/stores/language";
const languageStore = useLanguageStore();
</script>

<style scoped>
@keyframes squish {
    0% {
        transform: scaleX(1) scaleY(1);
    }

    35% {
        transform: scaleX(1.06) scaleY(0.94);
    }

    /* compress a bit */
    65% {
        transform: scaleX(0.97) scaleY(1.03);
    }

    /* rebound */
    100% {
        transform: scaleX(1) scaleY(1);
    }
}
</style>