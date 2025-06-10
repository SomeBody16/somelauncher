export type UseIntlResult = {
    t: typeof window.getTranslation
}

export const useIntl = (): UseIntlResult => {
    return {
        t: window.getTranslation,
    }
}
