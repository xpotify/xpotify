const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    icon: "./public/icons/.png/xLogo.png",
    width: 1080,
    height: 1920,
    fullscreen: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.webContents.openDevTools()
  win.removeMenu();
  win.loadURL('http://localhost:1212/v2');
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log('App closed!');
    app.quit()
  }
})