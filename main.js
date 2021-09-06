const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

let win 

function createWindow() {
     win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Hangamap',
        webPreferences: {
            nativeWindowOpen: true,
            preload: path.join( __dirname, '/src/js/preload.js')
        }
    })

    win.loadFile('index.html')

    win.on('closed', () => {
        win = null
    })

}

app.whenReady().then( () => {
    createWindow()

    app.on('activate', function() {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})