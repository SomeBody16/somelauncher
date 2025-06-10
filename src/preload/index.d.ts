import { ElectronAPI } from '@electron-toolkit/preload'
import { api } from './api'
import { App } from './config/app.types'
import { getTranslation, TranslationDefault as TranslationDefaultOriginal } from './lib'

declare global {
    type TranslationDefault = TranslationDefaultOriginal
    interface Window {
        electron: ElectronAPI
        api: typeof api
        config: App
        getTranslation: typeof getTranslation
    }
}
