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
const positioner = require('electron-traywindow-positioner')
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');



let mainWindow = null;
let tray = null;
let secondWindow = null;

function createWindow() {

 // mainWindow.webContents.openDevTools()

mainWindow = new BrowserWindow({
    width: 315,
    height: 590,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: true,
    transparent: true,
    webPreferences: {
      // Prevents renderer process code from not running when window is hidden
      backgroundThrottling: false
    }
  })


  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }))


  secondWindow = new BrowserWindow({
    frame: false,
    width: 500,
    height: 330,
    backgroundColor: '#312450',
    show: false,
    //parent: mainWindow
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


const showWindow = () => {
  const trayBounds = tray.getBounds()

positioner.position(mainWindow, trayBounds);
  mainWindow.show()
  mainWindow.focus()
}

const trayMenu = () => {
  if(process.platform==="darwin"){
    const trayIcon = path.join(__dirname, '../assets/darwin/iconTemplate@2x.png');
    tray = new Tray(trayIcon);
  } else {
    const trayIcon = path.join(__dirname, '../assets/win/icon.png');
    tray = new Tray(trayIcon);
  }
  
   


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

ipcMain.on("exit-stats", function(event, arg) {
  app.quit();
});

ipcMain.on("open-settings", function(event, arg) {
  secondWindow.show();
  
});

if(process.platform==="darwin"){
  ipcMain.on("set-icon", function(event, arg) {

    const trayIconNormal = path.join(__dirname, '../assets/darwin/iconTemplate@2x.png');
    const trayIconFail = path.join(__dirname, '../assets/darwin/iconfailTemplate@2x.png');
    if ( arg == "normal" ) {
     tray.setImage(trayIconNormal);
  }
    if ( arg == "fail" ) {
     tray.setImage(trayIconFail);
  }
  });
}



//Creates mainWindow and secondWindow and makes CMD + C and CMD + V work.
app.on('ready', function() {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
  trayMenu();

  if (process.platform === 'darwin') {
    app.dock.hide();
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

function sendStatusToWindow(text) {

  mainWindow.webContents.send('update', text);
}

//This is for future use. Note that valid now
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
  console.log(info);
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
  console.log(err)
})
autoUpdater.on('download-progress', (progressObj) => {
  
  console.log(progressObj)
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
  console.log(info);
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








