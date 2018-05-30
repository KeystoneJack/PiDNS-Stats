const {
  clipboard,
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain
} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow = null;
let tray = null;
let secondWindow = null;

function createWindow() {


mainWindow = new BrowserWindow({
    width: 300,
    height: 590,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is
      // hidden
      backgroundThrottling: false
    }
  })
//mainWindow.webContents.openDevTools()

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }))


  secondWindow = new BrowserWindow({
    frame: false,
    width: 500,
    height: 300,
    backgroundColor: '#312450',
    show: false,
    parent: mainWindow
  })

  secondWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../renderer/settings.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {

    mainWindow = null
  })
  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide()
    }
  })
}



const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  // check for sensible position of tray icon.
  // some systems will return all zero, so push to right instead.

  if ( trayBounds.x != '0' ) {
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
    const y = Math.round(trayBounds.y + trayBounds.height + 4)
    return {
      x: x,
      y: y }
    } else {
    const x = (windowBounds.x * 2);
    const y = Math.round(trayBounds.y + trayBounds.height + 4)
    return {
      x: x,
      y: y }
  }
}


const showWindow = () => {
  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
}

const trayMenu = () => {
  const trayIcon = path.join(__dirname, '../assets/icon.png');
   tray = new Tray(trayIcon);


  tray.on('double-click', function() {
    app.quit()
  });
  tray.on('click', toggleWindow);


}

//For opening and closing second window or settings window, on close it reloads mainWindow
ipcMain.on("user-data", function(event, arg) {
  secondWindow.hide()
  mainWindow.reload();
  mainWindow.show();
});


ipcMain.on("open-settings", function(event, arg) {
  secondWindow.show();
});

ipcMain.on("exit-stats", function(event, arg) {
  app.quit();
});


//Creates mainWindow and secondWindow and makes CMD + C and CMD + V work.
app.on('ready', function() {
  createWindow();
  trayMenu();

  if (process.platform === 'darwin') {
  // Create our menu entries so that we can use MAC shortcuts
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    }
  ]));
}
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (mainWindow === null) {
    createWindow()
  }
})


//Thanks to Kenneth, The Viking of the North for the name
//Thanks to Josy_Dom_Alexis on Pixabay for the icon
