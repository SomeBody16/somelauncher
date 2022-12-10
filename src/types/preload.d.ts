import type * as api from '../api'

declare global {
    interface Window {
        api: typeof api
        electron: {
            exit: () => void
        }
        store: {
            get: <T>(key: string, defaultValue?: T) => Promise<T | undefined>
            set: <T>(key: string, value?: T) => void
        }
    }
}

export {}
