import { ipcRenderer } from 'electron'
import * as api from './api'

window.api = api

window.electron = {
    exit: () => ipcRenderer.send('exit'),
}

window.store = {
    get: (key, defaultValue) => ipcRenderer.invoke('electron-store-get', key, defaultValue),
    set: (key, value) => {
        ipcRenderer.send('electron-store-set', key, value)
    },
}
