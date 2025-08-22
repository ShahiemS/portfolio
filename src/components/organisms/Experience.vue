<script lang="ts" setup>
import { ref, computed } from "vue";
import { useLanguageStore } from "@/stores/language";
import FilterButton from "../atoms/FilterButton.vue";
import { DotIcon } from "lucide-vue-next";

type Lang = "en" | "nl";
type Job = {
    company: string;
    stack: string[];
    i18n: Record<
        Lang,
        {
            role: string;
            period: string;
            highlights: string[];
        }
    >;
};

const jobs: Job[] = [
    {
        company: "4net",
        stack: ["NextJS", "React", "Vue", "Umbraco", "Optimizely", "Web Content Accessibility", "Core Web Vitals"],
        i18n: {
            en: {
                role: "Frontend Developer",
                period: "Jul 2024 – Present",
                highlights: ["Website maintenance and support for clients such as ProRail and WNF"],
            },
            nl: {
                role: "Frontend Developer",
                period: "jul. 2024 – heden",
                highlights: ["Websiteonderhoud en support voor klanten zoals ProRail en WNF"],
            },
        },
    },
    {
        company: "Decathlon",
        stack: ["React", "Svelte"],
        i18n: {
            en: {
                role: "Frontend Developer",
                period: "Aug 2020 – Jun 2024",
                highlights: [
                    "Maintained website and internal tools",
                    "Created landing pages and banners",
                    "Improved performance and accessibility",
                ],
            },
            nl: {
                role: "Frontend Developer",
                period: "aug. 2020 – jun. 2024",
                highlights: [
                    "Website en interne tools beheerd",
                    "Landingspagina’s en banners gemaakt",
                    "Performance en toegankelijkheid verbeterd",
                ],
            },
        },
    },
    {
        company: "Men In Green",
        stack: ["HTML5 ads", "Interactive Banners", "Homepage Takeover (HPTO)"],
        i18n: {
            en: {
                role: "Frontend Developer",
                period: "Apr 2018 – Apr 2020",
                highlights: [
                    "Designed and launched banners and high-visibility Homepage Takeovers (HPTOs) for leading brands such as Staatsloterij, bol, and Rituals.",
                ],
            },
            nl: {
                role: "Frontend Developer",
                period: "apr. 2018 – apr. 2020",
                highlights: [
                    "Banners en opvallende Homepage Takeovers (HPTO’s) ontworpen en gelanceerd voor o.a. Staatsloterij, bol en Rituals.",
                ],
            },
        },
    },
    {
        company: "Portico Consultancy",
        stack: ["Webdevelopment", "IBM Web Content Manager", "CMS"],
        i18n: {
            en: {
                role: "Content Management Specialist",
                period: "Sep 2017 – Mar 2018",
                highlights: [
                    "Worked with IBM Web Content Manager (WCM)",
                    "Developed an employee portal for ABN AMRO Bank",
                    "Developed an employee portal for the Dutch Tax Authorities",
                ],
            },
            nl: {
                role: "Content Management Specialist",
                period: "sep. 2017 – mrt. 2018",
                highlights: [
                    "Gewerkt met IBM Web Content Manager (WCM)",
                    "Medewerkerportaal ontwikkeld voor ABN AMRO",
                    "Medewerkerportaal ontwikkeld voor de Belastingdienst",
                ],
            },
        },
    },
    {
        company: "SenS Solutions",
        stack: ["Webdevelopment", "WordPress", "WooCommerce"],
        i18n: {
            en: {
                role: "Frontend Developer",
                period: "Oct 2015 – Dec 2016",
                highlights: ["Built and maintained websites and webshops"],
            },
            nl: {
                role: "Frontend Developer",
                period: "okt. 2015 – dec. 2016",
                highlights: ["Websites en webshops gebouwd en onderhouden"],
            },
        },
    },
    {
        company: "Gadget & Trends",
        stack: ["Webdevelopment", "Internship"],
        i18n: {
            en: {
                role: "Frontend Developer",
                period: "Sep 2014 – Apr 2015",
                highlights: ["Built and maintained websites and webshops"],
            },
            nl: {
                role: "Frontend Developer",
                period: "sep. 2014 – apr. 2015",
                highlights: ["Websites en webshops gebouwd en onderhouden"],
            },
        },
    },
];

const isActiveCompany = ref(0);

const languageStore = useLanguageStore();
const current = computed(() => jobs[isActiveCompany.value].i18n[languageStore.lang]);
</script>

<template>
    <div class="space-y-6">
        <div role="tablist" class="flex gap-2 overflow-x-auto no-scrollbar">
            <FilterButton :isActive="isActiveCompany === index" v-for="(job, index) in jobs" :key="job.company"
                @click="isActiveCompany = index" :label="job.company" :aria-selected="isActiveCompany === index" />
        </div>

        <div role="tabpanel" class="relative rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
            <div class="md:flex md:items-start md:justify-between gap-6">
                <div>
                    <h3 class="text-2xl md:text-3xl font-bold">{{ current.role }}</h3>
                    <div class="mt-1 text-purple-300 text-xl">{{ jobs[isActiveCompany].company }}</div>
                    <div class="mt-2 text-white/70">{{ current.period }}</div>

                    <ul class="mt-4 flex flex-wrap gap-2">
                        <li v-for="tech in jobs[isActiveCompany].stack" :key="tech"
                            class="text-xs rounded-full bg-white/10 ring-1 ring-white/10 px-2 py-1">
                            {{ tech }}
                        </li>
                    </ul>

                    <ul class="mt-6 space-y-3 text-white/80">
                        <li v-for="line in current.highlights" :key="line" class="flex items-center gap-1">
                            <DotIcon class="h-8 w-8 text-purple-300" />
                            <span>{{ line }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
