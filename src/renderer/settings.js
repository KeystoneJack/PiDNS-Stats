const Store = require("electron-store")
const store = new Store();
const remote = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
const appVersion = require('electron').remote.app.getVersion();




//Store the diffrent settings in settings page
var storeHostname = store.get("hostname");
var storeInterval = store.get("interval");
var storeToken = store.get("token");


$("#version").text(appVersion);
$("#hostname").val(storeHostname)
$("#intervalInput").val(storeInterval)
$("#tokenInput").val(storeToken)

store.get("hostname")
store.get("interval")
store.get("token")




$("#saveBtn").click(function() {
  var hostname = $("#hostname").val();
  var interval = $("#intervalInput").val();
  var token = $("#tokenInput").val();
  ipcRenderer.send("user-data", "ping");
  store.set("hostname", hostname);
  store.set("interval", interval);
  store.set("token", token);
  
})

$("#exitBtn").click(function() {
ipcRenderer.send("exit-stats", "exit");

})
