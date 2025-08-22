// stores/language.ts
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    lang: (localStorage.getItem('lang') as 'en' | 'nl') || 'en',
  }),
  actions: {
    setLang(newLang: 'en' | 'nl') {
      this.lang = newLang
      localStorage.setItem('lang', newLang)
    },
  },
})
