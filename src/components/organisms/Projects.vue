<script setup lang="ts">
import { computed, ref } from "vue";
import { useLanguageStore } from "@/stores/language";
import FilterButton from "../atoms/FilterButton.vue";

/* ===== i18n ===== */
type Lang = "en" | "nl";
type Labels = {
    filters: {
        all: string;
        web: string;
        banners: string;
        games: string;
    };
    ui: {
        preview: string;         // button on card
        open: string;            // open preview in new tab
        closePreview: string;    // aria label
        showingAt: string;       // "Showing at {w}×{h}."
    };
};

const labels: Record<Lang, Labels> = {
    en: {
        filters: { all: "All", web: "Web Development", banners: "HTML5 Banners", games: "Games" },
        ui: {
            preview: "Preview",
            open: "Open",
            closePreview: "Close preview",
            showingAt: "Showing at",
        },
    },
    nl: {
        filters: { all: "Alles", web: "Webdevelopment", banners: "HTML5-banners", games: "Games" },
        ui: {
            preview: "Voorbeeld",
            open: "Openen",
            closePreview: "Voorbeeld sluiten",
            showingAt: "Weergave op",
        },
    },
};

const languageStore = useLanguageStore();
const t = computed<Labels>(() => labels[languageStore.lang]);

type CategoryKey = "web" | "banners" | "games";
type FilterKey = "all" | CategoryKey;

type Project = {
    i18n: Record<Lang, { title: string; description: string }>;
    tags: readonly string[];
    category: CategoryKey;
    image?: string;
    href?: string;
    preview?: { src: string; width?: number; height?: number };
};

const selectedItem = ref<FilterKey>("all");

const filters: ReadonlyArray<FilterKey> = ["all", "web", "banners", "games"];

const items: ReadonlyArray<Project> = [
    {
        i18n: {
            en: { title: "StreamSpice", description: "Boost your livestream with widgets, overlays, and alerts." },
            nl: { title: "StreamSpice", description: "Boost je livestream met widgets, overlays en alerts." },
        },
        tags: ["NextJS", "Livestream", "OBS", "Twitch", "YouTube", "Kick"],
        category: "web",
        image: "/images/streamspice.png",
        href: "https://streamspice.io",
    },
    {
        i18n: {
            en: {
                title: "WhatTheSocket",
                description: "A lightweight WebSocket client with auto-reconnect and event-based messaging in TypeScript.",
            },
            nl: {
                title: "WhatTheSocket",
                description: "Lichtgewicht WebSocket-client met auto-reconnect en event-based messaging in TypeScript.",
            },
        },
        tags: ["TypeScript", "Websockets", "Package"],
        category: "web",
        href: "https://github.com/ShahiemS/whatthesocket",
    },
    {
        i18n: {
            en: {
                title: "ColorTrails",
                description: "A lightweight WebSocket client with auto-reconnect and event-based messaging in TypeScript.",
            },
            nl: {
                title: "ColorTrails",
                description: "Lichtgewicht WebSocket-client met auto-reconnect en event-based messaging in TypeScript.",
            },
        },
        tags: ["TypeScript", "ThreeJS", "Game"],
        category: "games",
        href: "https://github.com/ShahiemS/whatthesocket",
    },
    {
        i18n: {
            en: { title: "BoomBrush", description: "Lightweight, spec-compliant HTML5 banners for multiple networks." },
            nl: { title: "BoomBrush", description: "Lichte, spec-conforme HTML5-banners voor meerdere netwerken." },
        },
        tags: ["GSAP", "HTML5"],
        category: "banners",
        preview: { src: "/banners/demo/index.html", width: 300, height: 250 },
    },
    {
        i18n: {
            en: { title: "Sanas", description: "Lightweight, spec-compliant HTML5 banners for multiple networks." },
            nl: { title: "Sanas", description: "Lichte, spec-conforme HTML5-banners voor meerdere netwerken." },
        },
        tags: ["GSAP", "HTML5"],
        category: "banners",
        preview: { src: "/banners/demo/index.html", width: 300, height: 250 },
    },
];

// Filtered & localized list
const projects = computed(() => {
    const list = selectedItem.value === "all" ? items : items.filter((i) => i.category === selectedItem.value);
    return list.map((p) => ({
        ...p,
        title: p.i18n[languageStore.lang].title,
        description: p.i18n[languageStore.lang].description,
    }));
});

const isExternal = (url?: string) => !!url && /^(?:https?:)?\/\//i.test(url);

/* ===========================
   Modeless slide-over preview
   =========================== */
const selectedPreview = ref<null | { title: string; src: string; width?: number; height?: number }>(null);

const openPreview = (p: Project & { title?: string; description?: string }) => {
    if (!p.preview) return;
    selectedPreview.value = {
        title: p.i18n[languageStore.lang].title,
        src: p.preview.src,
        width: p.preview.width,
        height: p.preview.height,
    };
};
const closePreview = () => (selectedPreview.value = null);

// UI helpers for filter labels
const filterLabel = (f: FilterKey) =>
    f === "all" ? t.value.filters.all : t.value.filters[f];
</script>

<template>
    <div class="my-10">
        <!-- Filters -->
        <div class="mb-6 flex flex-wrap gap-2">
            <FilterButton v-for="filter in filters" :key="filter" :label="filterLabel(filter)"
                @click="selectedItem = filter" :aria-pressed="selectedItem === filter" />
        </div>

        <!-- Cards grid -->
        <div class="grid gap-5 md:grid-cols-3">
            <a v-for="project in projects" :key="project.i18n[languageStore.lang].title"
                class="group block rounded-3xl bg-white/5 ring-1 ring-white/10 p-5 hover:ring-white/20 transition shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                :href="project.href || '#'" :target="isExternal(project.href) ? '_blank' : undefined"
                :rel="isExternal(project.href) ? 'noopener noreferrer' : undefined" :aria-label="project.title">
                <div class="aspect-[16/10] rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                    <template v-if="project.image">
                        <img :src="project.image" class="w-full h-full object-cover" :alt="project.title" loading="lazy"
                            decoding="async" />
                    </template>
                    <template v-else>
                        <div class="w-full h-full flex items-center justify-center p-4 text-center">
                            <span class="text-base md:text-lg font-semibold text-white/80">
                                {{ project.title }}
                            </span>
                        </div>
                    </template>
                </div>

                <!-- Header row with Preview button (does not navigate) -->
                <div class="mt-4 flex items-center gap-2">
                    <h3 class="text-lg font-semibold flex-1">
                        {{ project.title }}
                    </h3>

                    <button v-if="project.preview"
                        class="rounded-full px-3 py-1 cursor-pointer text-xs font-medium bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                        type="button" @click.stop.prevent="openPreview(project)"
                        :aria-label="`${t.ui.preview} ${project.title}`">
                        {{ t.ui.preview }}
                    </button>
                </div>

                <p class="mt-2 text-sm text-white/70">
                    {{ project.description }}
                </p>

                <div class="mt-3 flex flex-wrap gap-2">
                    <span v-for="(tag, index) in project.tags" :key="index"
                        class="text-xs rounded-full bg-white/10 ring-1 ring-white/10 px-2 py-1 mt-3">
                        {{ tag }}
                    </span>
                </div>

                <!-- Optional: inline preview on small screens (non-blocking) -->
                <div v-if="project.preview && selectedPreview?.src === project.preview.src"
                    class="mt-4 block lg:hidden">
                    <div class="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black">
                        <iframe :src="project.preview.src" :title="project.title + ' (inline preview)'"
                            class="block w-full" style="aspect-ratio: 16/9;" loading="lazy" decoding="async"
                            sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                            referrerpolicy="no-referrer"></iframe>
                    </div>
                </div>
            </a>
        </div>
    </div>

    <!-- ===== Modeless Overlay Slide-over ===== -->
    <teleport to="body">
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="selectedPreview" class="fixed inset-0 z-50 pointer-events-none" aria-live="polite">
                <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

                <div class="absolute right-0 top-0 h-full w-full max-w-[560px] pointer-events-auto">
                    <Transition enter-active-class="transform transition ease-out duration-200"
                        enter-from-class="translate-x-full" enter-to-class="translate-x-0"
                        leave-active-class="transform transition ease-in duration-150" leave-from-class="translate-x-0"
                        leave-to-class="translate-x-full">
                        <section v-if="selectedPreview"
                            class="h-full bg-zinc-900/95 ring-1 ring-white/10 shadow-2xl flex flex-col" role="region"
                            :aria-label="`${t.ui.preview}: ${selectedPreview.title}`">
                            <!-- header -->
                            <div class="px-4 sm:px-5 py-3 flex items-center gap-3 border-b border-white/10">
                                <h2 class="text-sm font-semibold truncate text-white">
                                    {{ selectedPreview.title }}
                                </h2>
                                <div class="ml-auto flex items-center gap-2">
                                    <button
                                        class="rounded-full p-2 ring-1 ring-white/15 text-white hover:bg-white/10 transition"
                                        @click="closePreview" :aria-label="t.ui.closePreview">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M18 6 6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- iframe area -->
                            <div class="p-4 sm:p-5 overflow-auto">
                                <div class="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black inline-block">
                                    <iframe :src="selectedPreview.src" :title="selectedPreview.title" class="block"
                                        :style="{
                                            width: (selectedPreview.width || 640) + 'px',
                                            height: (selectedPreview.height || 360) + 'px',
                                            maxWidth: '100%'
                                        }" loading="lazy" decoding="async"
                                        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                                        referrerpolicy="no-referrer"></iframe>
                                </div>

                                <p class="mt-3 text-xs text-white/60">
                                    {{ t.ui.showingAt }} {{ selectedPreview.width || 640 }}×{{ selectedPreview.height ||
                                        360
                                    }}.
                                </p>
                            </div>
                        </section>
                    </Transition>
                </div>
            </div>
        </Transition>
    </teleport>
</template>
