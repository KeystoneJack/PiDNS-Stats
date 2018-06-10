const {
  autoUpdater
} = require("electron-updater")
const {
  dialog,
  Notification
} = require("electron")

function checkUpdates() {
  autoUpdater.on("checking-for-update", (info) => {

  })
  autoUpdater.on("update-available", (info) => {

    dialog.showMessageBox({
      type: 'question',
      buttons: ['Install & Relaunch', 'Later'],
      defaultId: 0,
      cancelId: 1,
      message: "New version is available",
      detail: "It will be downloaded in the background \n \n Changelog: \n" + info.releaseNotes

    }, response => {
      if (response === 0) {
        autoUpdater.downloadUpdate();
      }
    });

  })
  autoUpdater.on("update-not-available", (info) => {

  })
  autoUpdater.on("error", (err) => {

  })
  autoUpdater.on("download-progress", (progressObj) => {

  })

  autoUpdater.on("update-downloaded", (info) => {
    autoUpdater.quitAndInstall();
  })

  autoUpdater.checkForUpdates()
}

module.exports = {
  checkUpdates
}
