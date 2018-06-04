const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const Store = require("electron-store")
const store = new Store()
const remote = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
const jquery = require("jquery")

var token = store.get("token");
var hostname = store.get("hostname");
var intervalTime = 10;
intervalTime = store.get("interval");


//Send ipc to main.js to open settings
$("#settings").click(function() {
  ipcRenderer.send("open-settings", "an-argument");
})



new Vue({
  el: "#output",


  data() {
    return {
      raw: [],
      top: [],
      recent: [],
      //statusDNS: [], //For upcoming release
      loading: 1,
      error: 0

    };
  },

  // Fetches posts when the component is created which is needed for initial setup
  created() {

    var config = {
      baseURL: hostname
    };

    var auth = token;
      ipcRenderer.send("set-icon", "normal");
      axios.all([
            axios.get('/admin/api.php?topItems=10&auth=' + auth, config),
            axios.get("/admin/api.php", config),
            axios.get("/admin/api.php?recentBlocked", config)
            //axios.get("/admin/api.php?status&auth="+ auth, config)

            
           ])
     
       .then(axios.spread((topItems, rawData, recentData) => {
         this.top = topItems.data.top_queries;
         this.raw = rawData.data;
         this.recent = recentData.data;
         //this.statusDNS = JSON.stringify(response.data).slice(11,18); //For upcoming release
        
        //For setting error and loading screen
         this.loading = 0;
         this.error=0;



       }))
       .catch((error) => {
         // Error
         ipcRenderer.send("set-icon", "fail");
         if (error.response) {
           this.error = 1;
           this.loading = 0;
         } else if (error.request) {
           this.error = 1;
           this.loading = 0;
        //   console.log(error.request);
         } else {
           this.error = 1;
           this.loading = 0;
        //   console.log('Error', error.message);
         }
        // console.log(error.config);
       });

  },

  //Fetch data when div element is mounted
  mounted(){

    var config = {
      baseURL: hostname
    };
    var auth = token;
    var self = this;
      ipcRenderer.send("set-icon", "normal");
      axios.all([

             setInterval(function(){
               axios.get('/admin/api.php?topItems=10&auth=' + auth, config).then(response => {
                 self.top=response.data.top_queries
                 self.loading = 0;
                 self.error = 0;
               });
             axios.get("/admin/api.php", config).then(response => {
               self.raw=response.data
               self.loading = 0;
               self.error = 0;
             });
             axios.get("/admin/api.php?recentBlocked", config).then(response => {
              self.recent=response.data;
              
            });

             /*
            -----------------------------------------------------------------------------------
            This is for an upcoming release where you request status of Pi-Hole and the displays
            that in the app itself. Will be a toggle swith so you can switch it off and on.
            -----------------------------------------------------------------------------------
             */

            /* axios.get("/admin/api.php?status&auth="+ auth, config).then(response => {
               
               self.loading = 0;
               self.error = 0;
               self.statusDNS = JSON.stringify(response.data).slice(11,18);
               
             });*/
           },intervalTime*1000)
           ])


       .catch((error) => {
         // Error
         ipcRenderer.send("set-icon", "fail");
         if (error.response) {
           this.error = 1;
           this.loading = 0;
         } else if (error.request) {
           this.error = 1;
           this.loading = 0;
           //console.log(error.request);
         } else {
           this.error = 1;
           this.loading = 0;
           //console.log('Error', error.message);
         }
         //console.log(error.config);
       });

  }
});
