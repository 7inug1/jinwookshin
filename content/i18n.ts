export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

/** 두 언어를 함께 담는 값 */
export type L = Record<Locale, string>;

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeNames: Record<Locale, string> = { ko: "한국어", en: "English" };
export const htmlLang: Record<Locale, string> = { ko: "ko", en: "en" };
