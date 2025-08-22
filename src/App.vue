<script setup lang="ts">
import { computed } from "vue";
import { useLanguageStore } from "@/stores/language";

import Contact from "./components/molecules/Contact.vue";
import GridPattern from "./components/molecules/GridPattern.vue";
import Footer from "./components/organisms/Footer.vue";
import Header from "./components/organisms/Header.vue";
import Hero from "./components/organisms/Hero.vue";
import Projects from "./components/organisms/Projects.vue";
import Section from "./components/molecules/Section.vue";
import Experience from "./components/organisms/Experience.vue";
import BackToTop from "./components/molecules/BackToTop.vue";

// i18n
type Lang = "en" | "nl";
type Labels = {
  about: string;
  experience: string;
  work: string;
  contact: string;
  aboutLead1: string;
  aboutLead2: string;
  aboutHobbies: string;
  aboutClose: string;
};

const labels: Record<Lang, Labels> = {
  en: {
    about: "About",
    experience: "Experience",
    work: "Work",
    contact: "Contact",
    aboutLead1:
      "Hello there! I’m",
    aboutLead2:
      ", a creative developer. I build fun things like games, banners, and web apps.",
    aboutHobbies:
      "Outside of work I enjoy cycling, watching TV, cooking, gaming, drawing, and traveling. Oh, and I’m a huge Harry Potter fan! 🧙",
    aboutClose:
      "Let’s chat and share our love for creativity and technology!",
  },
  nl: {
    about: "Over",
    experience: "Werkervaring",
    work: "Werk",
    contact: "Contact",
    aboutLead1:
      "Hallo daar! Ik ben",
    aboutLead2:
      ", een creative developer. Ik maak gave dingen zoals games, banners en webapplicaties.",
    aboutHobbies:
      "Buiten het werk geniet ik van fietsen, tv kijken, koken, gamen, tekenen en reizen. Oh, en ik ben een enorme Harry Potter-fan! 🧙",
    aboutClose:
      "Laten we kletsen en onze liefde voor creativiteit en technologie delen!",
  },
};

const languageStore = useLanguageStore();
const t = computed<Labels>(() => labels[languageStore.lang]);
</script>

<template>
  <Header />

  <div class="min-h-screen w-full bg-black text-white overflow-hidden relative">
    <GridPattern />

    <main class="relative z-10 mx-auto max-w-6xl px-6 pb-24">
      <Hero />

      <Section id="about" :title="t.about">
        <p>
          {{ t.aboutLead1 }}
          <strong> Shahiem Seymor</strong>{{ t.aboutLead2 }}
        </p>
        <p>
          {{ t.aboutHobbies }}
        </p>
        <p>
          {{ t.aboutClose }}
        </p>
      </Section>

      <Section id="experience" :title="t.experience">
        <Experience />
      </Section>

      <Section id="work" :title="t.work">
        <Projects />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>

      <Footer />
      <BackToTop />
    </main>
  </div>
</template>
