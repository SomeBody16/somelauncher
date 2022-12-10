import { app, BrowserWindow, ipcMain } from 'electron'
import './store'

import updateApp from 'update-electron-app'
updateApp({
    repo: 'SomeBody16/somelauncher',
})

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
    app.quit()
}

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,

            nodeIntegration: true,
            contextIsolation: false,
        },

        backgroundColor: '#141517',
        frame: false,
        resizable: false,
    })

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
    mainWindow.webContents.openDevTools()

    ipcMain.on('exit', () => mainWindow?.close())
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
