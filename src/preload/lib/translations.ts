import { osLocaleSync } from 'os-locale'
import { translations } from '../config/translations'

export type TranslationDefault = (typeof translations)['en-US']
export type TranslationKey = keyof TranslationDefault

/**
 * @param key The translation key to look up.
 *            It can be a specific key like 'app.name' or a task key like 'task.init'.
 *            It can also be a string that matches the key type.
 *            If the key is not found, it will return the key itself.
 * @returns The translated string for the given key based on the current locale.
 *          If the locale is not found, it defaults to 'en-US'.
 *          If the key is not found in the translations, it returns the key itself.
 */
export const getTranslation = (key: TranslationKey | (string & {})): string => {
    const locale = osLocaleSync() ?? 'en-US'
    const translation = translations[locale]
    const keys = key.split('.')
    let result = translation
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k]
        } else {
            return key // Return the key itself if not found
        }
    }
    return result || key // Return the result or the key if not found
}
