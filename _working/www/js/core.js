var app = {
  // Application Constructor
  initialize: function() {
    app.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('online', this.onDeviceOnline, false);
    document.addEventListener('offline', this.onDeviceOffline, false);
    document.addEventListener('load', this.onAppLoad, false);
    document.addEventListener('pause', this.onAppPaused, false);
    document.addEventListener('resume', this.onAppResumed, false);
  },
  onDeviceReady: function() {
    //device is ready, so start all your app initializations
    console.log('Device ready, yo');
  },
  onDeviceOnline: function() {
    //device is ready, so start all your app initializations
    console.log('Internet connection confirmed');
  },
  onDeviceOffline: function() {
    //device is ready, so start all your app initializations
    console.log('Internet connection unavailable');
  },
  onAppLoad: function() {
    //app is loaded
  },
  onAppPaused: function() {
    //app is sent to background processing
    console.log('App sent to background');
  },
  onAppResumed: function() {
    //app is loaded
    console.log('App resumed from background');
  }
};
