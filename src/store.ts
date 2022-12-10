import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store()

ipcMain.handle('electron-store-get', async (_, key, defaultValue) => {
    return store.get(key, defaultValue)
})
ipcMain.on('electron-store-set', async (_, key, value) => {
    store.set(key, value)
})

export default store
