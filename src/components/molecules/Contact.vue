<script lang="ts" setup>
import { computed } from "vue";
import { useLanguageStore } from "@/stores/language";
import { useProtectedEmail } from "@/composables/useProtectedEmail";
import LinkPill from "../atoms/LinkPill.vue";
import { Mail, Github, Linkedin } from "lucide-vue-next";

// i18n
type Lang = "en" | "nl";
type Labels = {
    intro: string;
    email: string;
    linkedin: string;
    github: string;
    emailLabel: string;
    emailVisible: string;
};

const labels: Record<Lang, Labels> = {
    en: {
        intro:
            "Got an idea or a brief? I’m open to freelance and collaboration. Drop a line and I’ll get back to you.",
        email: "Email me",
        linkedin: "LinkedIn",
        github: "GitHub",
        emailLabel: "Send me an email",
        emailVisible: "shahiem.mail [at] gmail [dot] com",
    },
    nl: {
        intro:
            "Heb je een idee of opdracht? Ik sta open voor freelance en samenwerking. Stuur een bericht en ik neem contact op.",
        email: "Stuur e-mail",
        linkedin: "LinkedIn",
        github: "GitHub",
        emailLabel: "Stuur me een e-mail",
        emailVisible: "shahiem.mail [apestaartje] gmail [punt] com",
    },
};

const languageStore = useLanguageStore();
const t = computed<Labels>(() => labels[languageStore.lang]);

// Spam-safe email via composable
const encoded = "c2hhaGllbS5tYWlsK3Jlc3VtZUBnbWFpbC5jb20=";

const email = useProtectedEmail({
    encoded,
    visible: t.value.emailVisible,
    label: t.value.emailLabel,
});
</script>

<template>
    <div class="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 my-10">
        <p class="text-white/80">
            {{ t.intro }}
        </p>

        <div class="mt-4 flex flex-wrap gap-3">
            <!-- Email pill (button, no href in DOM) -->
            <LinkPill as="button" type="button" class="cursor-pointer" :icon="Mail" :aria-label="email.ariaLabel"
                @click="email.open" @keydown="email.onKey">
                {{ t.email }}
            </LinkPill>

            <!-- LinkedIn -->
            <LinkPill href="https://www.linkedin.com/in/shahiemseymor" :icon="Linkedin">
                {{ t.linkedin }}
            </LinkPill>

            <!-- GitHub -->
            <LinkPill href="https://github.com/ShahiemS" :icon="Github">
                {{ t.github }}
            </LinkPill>
        </div>
    </div>
</template>
