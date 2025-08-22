<script lang="ts" setup>
import { computed } from "vue";
import { useLanguageStore } from "@/stores/language";
import { useProtectedEmail } from "@/composables/useProtectedEmail";
import LinkPill from "../atoms/LinkPill.vue";
import { Mail, Github, LucideLinkedin, Paperclip } from "lucide-vue-next";

// i18n
type Lang = "en" | "nl";
type Labels = {
  hello: string;
  roles: string;
  resume: string;
  resumeLink: string;
  emailLabel: string;
  emailVisible: string; // obfuscated text shown to users
};

const labels: Record<Lang, Labels> = {
  en: {
    hello: "Hello, my name is",
    roles: "Front-End Developer · Creative Developer",
    resume: "View resume",
    resumeLink: "/resume/ResumeShahiem_EN.pdf",
    emailLabel: "Send me an email",
    emailVisible: "shahiem.mail [at] gmail [dot] com",
  },
  nl: {
    hello: "Hallo, mijn naam is",
    roles: "Front-endontwikkelaar · Creatieve developer",
    resume: "Bekijk CV",
    resumeLink: "/resume/ResumeShahiem_NL.pdf",
    emailLabel: "Stuur me een e-mail",
    emailVisible: "shahiem.mail [apestaartje] gmail [punt] com",
  },
};

const languageStore = useLanguageStore();
const t = computed<Labels>(() => labels[languageStore.lang]);

const encoded = "c2hhaGllbS5tYWlsK3Jlc3VtZUBnbWFpbC5jb20=";
const email = useProtectedEmail({
  encoded,
  visible: t.value.emailVisible,
  label: t.value.emailLabel,
  subject: "Hi Shahiem",
  body: "I'd love to talk about..."
});
</script>

<template>
  <section class="pt-8 md:pt-14">
    <div class="flex justify-between gap-10 items-center">
      <div>
        <div class="text-sm uppercase tracking-[0.25em] text-white/60">
          {{ t.hello }}
        </div>

        <h1
          class="mt-2 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
          <span class="font-[900]">Shahiem Seymor</span>
        </h1>

        <p class="mt-4 text-lg md:text-xl text-white/90">
          {{ t.roles }}
        </p>

        <ul class="mt-6 space-y-2 text-white/80">
          <li class="flex items-center gap-3">
            <Mail class="h-5 w-5" />
            <!-- Behaves like a link; email only revealed on click -->
            <button type="button" class="underline decoration-white/30 hover:decoration-white text-left"
              @click="email.open" @keydown="email.onKey">
              {{ email.visibleText }}
            </button>
            <noscript><span class="ml-2">{{ email.visibleText }}</span></noscript>
          </li>
        </ul>

        <div class="mt-8 flex flex-wrap gap-3">
          <!-- Resume pill (localized text + href) -->
          <LinkPill :href="t.resumeLink" :icon="Paperclip"
            class="!bg-[#F6F3FF] !border-[#7C3AED] !text-[#7C3AED] hover:!bg-[#EDE6FF] hover:!border-[#6D28D9]">
            {{ t.resume }}
          </LinkPill>

          <!-- LinkedIn -->
          <LinkPill href="https://www.linkedin.com/in/shahiemseymor" :icon="LucideLinkedin"
            class="!bg-[#E8F3FC] !border-[#0A66C2] !text-[#0A66C2] hover:!bg-[#D0E7F9] hover:!border-[#004182] hover:!text-[#004182]">
            /shahiemseymor
          </LinkPill>

          <!-- GitHub -->
          <LinkPill href="https://github.com/ShahiemS" :icon="Github">
            /ShahiemS
          </LinkPill>
        </div>
      </div>

      <div class="relative">
        <div class="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5 backdrop-blur-sm shadow-xl">
          <div
            class="aspect-square w-full rounded-2xl bg-neutral-900 ring-1 ring-white/10 overflow-hidden grid place-items-center">
            <div class="max-w-[300px]">
              <img src="https://www.shahiemseymor.com/photo.webp" alt="Portrait of Shahiem Seymor" loading="lazy"
                decoding="async" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
