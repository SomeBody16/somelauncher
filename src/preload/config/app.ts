import { electronAPI } from '@electron-toolkit/preload'
import { App } from './app.types'

export const config: App = {
    modpack: {
        remote: {
            url: 'https://github.com/SomeBody16/some-hunters-1.18-client',
            branch: 'main',
        },
        local: {
            getPath: () => `${electronAPI.process.platform('userData')}/modpack`,
        },
    },
    progress: {
        color: {
            working: 'blue',
            error: 'red',
            success: 'green',
        },
    },
}
