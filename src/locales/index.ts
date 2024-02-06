import type { App } from 'vue';
import type { I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { snakeCase } from 'change-case';

import { useBaseStore } from '@/store';

export let i18n: ReturnType<typeof createI18n>;

export async function getLocalLang(lang: string): Promise<any[]> {
  let defaultLocal = import.meta.glob(`./lang/zh/*.ts`);
  switch (lang) {
    case 'en':
      defaultLocal = import.meta.glob(`./lang/en/*.ts`);
      break;
    case 'ja':
      defaultLocal = import.meta.glob(`./lang/ja/*.ts`);
      break;
    default:
      break;
  }

  const localLang: Record<string, unknown> = {};

  for (const item in defaultLocal) {
    const fileName = item.replace(`./lang/${lang}/`, '').replace('.ts', '');
    const langObject = await defaultLocal[item]?.();
    localLang[snakeCase(fileName)] = langObject.default;
  }

  return [localLang];
}

// 设置本地语言
export async function setAppLang(lang: string) {
  const [localLang] = await getLocalLang(lang);
  const { setLang } = useBaseStore();
  i18n.global.setLocaleMessage(lang, localLang);
  (i18n.global.locale as unknown as any).value = lang;
  setLang(lang);
}

async function createI18nOptions(): Promise<I18nOptions> {
  const { lang = 'zh' } = useBaseStore();
  const [localLang] = await getLocalLang(lang);
  return {
    legacy: false,
    globalInjection: true,
    inheritLocale: false,
    locale: lang,
    fallbackLocale: 'zh',
    messages: {
      [lang]: localLang
    }
  };
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
