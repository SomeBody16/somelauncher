import { app, BrowserWindow, ipcMain } from 'electron'
import './store'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require('electron-squirrel-startup')) {
    app.quit()
}

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 1280 / 2,
        height: 720 / 2,
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

    console.log({ env: process.env.NODE_ENV })
    process.env.NODE_ENV === 'development' && mainWindow.webContents.openDevTools()

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
