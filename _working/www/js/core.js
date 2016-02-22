// core.js
// v2.0.0
'use strict';

function require(script) {
  $.ajax({
    url: 'js/'+script,
    dataType: "script",
    async: false,           // <-- This is the key
    success: function () {
      // all good...
      //DEBUG
      console.warn('Loaded external file: '+script);
    },
    error: function () {
      throw new Error("Could not load script " + script);
    }
  });
}

// load app configurations
  require('inc/configure.js');

// add logger
  // l.s(content, 0|1|2);
  require('inc/logger.js');

// touchable item event dispatcher
  require('inc/touch.js');

// views constructor
  require('inc/views.js');

var meta = {
  locale : '',
  isOnline : false
};

var app = {
  // Application Constructor
  initialize: function() { 'use strict';
    app.bindEvents();
  },
  bindEvents: function() { 'use strict';
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('online', this.onDeviceOnline, false);
    document.addEventListener('offline', this.onDeviceOffline, false);
    document.addEventListener('load', this.onAppLoad, false);
    document.addEventListener('pause', this.onAppPaused, false);
    document.addEventListener('resume', this.onAppResumed, false);
  },
  onDeviceReady: function() { 'use strict';
    //device is ready, so start all your app initializations
    console.log('Device ready, yo');
    if (meta.isOnline) Parse.initialize(config.parse.ApplicationID, config.parse.JavascriptKey);
    app.setLocale();
    $('screen#calculate helper').removeClass('hide');
    views.initialize();
    touch.initialize();
  },
  onDeviceOnline: function() { 'use strict';
    //device is ready, so start all your app initializations
    console.log('Internet connection confirmed');
    meta.isOnline = true;
  },
  onDeviceOffline: function() { 'use strict';
    //device is ready, so start all your app initializations
    console.log('Internet connection unavailable');
    meta.isOnline = false;
  },
  onAppLoad: function() { 'use strict';
    //app is loaded
  },
  onAppPaused: function() { 'use strict';
    //app is sent to background processing
    console.log('App sent to background');
  },
  onAppResumed: function() { 'use strict';
    //app is loaded
    console.log('App resumed from background');
  },
  setLocale: function() { 'use strict';
    meta.locale = 'en-CA';
    navigator.globalization.getPreferredLanguage(function(l){
      'use strict';
      meta.locale = l.value;
    }, function(e){
      'use strict';
      //DEBUG
      console.error('Couldn\'t get the system locale.');
      console.error(e);
    });
    moment.locale(meta.locale);
  }
};
