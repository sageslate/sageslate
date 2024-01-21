/// <reference types="@vueuse/shared" />

import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'

import enUS from '@/locales/en-US.json'

export type MessageSchema = typeof enUS

const messages = {
  'en-US': enUS,
}

type Locale = keyof typeof messages

export const selectedLocale = useLocalStorage<Locale>(
  'locale',
  (navigator.languages.find(language => language in messages) as Locale | undefined) ?? 'en-US',
)

export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: selectedLocale.value,
  fallbackLocale: 'en-US',
  messages,
})

watch(selectedLocale, () => {
  i18n.global.locale.value = selectedLocale.value
})
