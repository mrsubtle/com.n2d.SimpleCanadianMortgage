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

// touchable item event dispatcher
  require('inc/menu.js');

// views constructor
  require('inc/views.js');

var meta = {
  locale : '',
  isOnline : false,
  data : {
    principal : 200000,       //in dollars, formatted via utility.formatNumber
    amortization : 300,       //in months, 300 = 25 years, formatted via utility.formatMonthsToYears and utility.formatYearsToMonths
    rate : 0.01111,           //simplified percentage to 3 decimals, formatted via utility.formatPercent
    rateType : 0,             //0 = semi-annual not compounded in advance (CDN), 1 = compounded (USA)
    frequency : 26,           //number of payment in a year; 1 = annually, 2 = semi-annually, 4 = quarterly, 12 = monthly, 24 = semi-monthly, 26 = bi-weekly, 52 = weekly
    downPercent : 0.05,       //simplified percentage to 3 decimals, formatted via utility.formatPercent
    downAmount : 10000,       //in dollars, formatted via utility.formatNumber
    ltv : 0.95,               //(1 - downPercent)
    insurableAmount : 190000, //(principal - downAmount)
    insuranceTeir : 1,        //defined in cmhc Array
    insurancePercent : 0.036, //simplified percentage to 3 decimals, formatted via utility.formatPercent
    insuranceAmount : 6840,   //(insurableAmount * insurancePercent), in dollars, formatted via utility.formatNumber
    transactionType : 0,      //0 = purchase, 1 = refinance, 2 = port
    financedAmount : 196840,  //(insurableAmount + insuranceAmount)
  }
};

var cmhc = {
  purchase : [
    { //Non-Traditional Down Payment
      ltvMin : 0.9001,
      ltvMax : 0.95,
      rate : 0.0385
    },
    { //Tier 1
      ltvMin : 0,
      ltvMax : 0.95,
      rate : 0.036
    },
    { //Tier 2
      ltvMin : 0,
      ltvMax : 0.9,
      rate : 0.024
    },
    { //Tier 3
      ltvMin : 0,
      ltvMax : 0.85,
      rate : 0.018
    },
    { //Tier 4 
      ltvMin : 0,
      ltvMax : 0.8,
      rate : 0.0125
    },
    { //Tier 5 
      ltvMin : 0,
      ltvMax : 0.75,
      rate : 0.0075
    },
    { //Tier 6 
      ltvMin : 0,
      ltvMax : 0.6,
      rate : 0.006
    }
  ],
  refinance : [
    { //Non-Traditional Down Payment not available for refinance
      ltvMin : 1,
      ltvMax : 1,
      rate : 0
    },
    { //Tier 1 not available for refinance
      ltvMin : 1,
      ltvMax : 1,
      rate : 0
    },
    { //Tier 2 not available for refinance
      ltvMin : 1,
      ltvMax : 1,
      rate : 0
    },
    { //Tier 3 not available for refinance
      ltvMin : 1,
      ltvMax : 1,
      rate : 0
    },
    { //Tier 4 
      ltvMin : 0,
      ltvMax : 0.8,
      rate : 0.0315
    },
    { //Tier 5 
      ltvMin : 0,
      ltvMax : 0.75,
      rate : 0.0260
    },
    { //Tier 6 
      ltvMin : 0,
      ltvMax : 0.6,
      rate : 0.006
    }
  ],
  port : [
    { //Non-Traditional Down Payment not available for porting
      ltvMin : 1,
      ltvMax : 1,
      rate : 0
    },
    { //Tier 1 
      ltvMin : 0,
      ltvMax : 0,
      rate : 0
    },
    { //Tier 2
      ltvMin : 0,
      ltvMax : 0,
      rate : 0
    },
    { //Tier 3
      ltvMin : 0,
      ltvMax : 0,
      rate : 0
    },
    { //Tier 4 
      ltvMin : 0,
      ltvMax : 0.8,
      rate : 0.0315
    },
    { //Tier 5 
      ltvMin : 0,
      ltvMax : 0.75,
      rate : 0.0260
    },
    { //Tier 6 
      ltvMin : 0,
      ltvMax : 0.6,
      rate : 0.006
    }
  ]
};

var utility = {
  getPayment : function(principal,numPmtsYr,interestRate,amortization) {
    var p = principal;
    var n = numPmtsYr;
    var i = interestRate;
    var a = amortization;
    var payment = 0;
    
    payment = ((i/n)*p) / ( 1 - Math.pow((1+(i/n)),(-1*a*n)) );

    //round to the nearest integer to reinforce "estimates-only"
    payment = Math.round(payment);

    //check for horrible values, or return a proper formatted number
    if ( isFinite(payment) == false ) {
      payment = "-";
    } else {
      payment = utility.formatNumber(payment,0,0,true);
    }

    return payment;

  },
  formatNumber : function(number, digits, decimalPlaces, withCommas){
    number = number.toString();
    var simpleNumber = '';

    // Strips out the dollar sign and commas.
    for (var i = 0; i < number.length; ++i) {
      if ("0123456789.".indexOf(number.charAt(i)) >= 0) simpleNumber += number.charAt(i);
    }

     number = parseFloat(simpleNumber);

     if (isNaN(number)) number = 0;
     if (withCommas == null) withCommas = false;
     if (digits     == 0) digits = 1;

     var integerPart = (decimalPlaces > 0 ? Math.floor(number) : Math.round(number));
     var string = "";

     for (var i = 0; i < digits || integerPart > 0; ++i) {
      // Insert a comma every three digits.
      if (withCommas && string.match(/^\d\d\d/)) string = "," + string;
      string = (integerPart % 10) + string;
      integerPart = Math.floor(integerPart / 10);
    }

    if (decimalPlaces > 0) {
      number -= Math.floor(number);
      number *= Math.pow(10, decimalPlaces);
      string += "." + utility.formatNumber(number, decimalPlaces, 0);
    }

    if (string == '0.00') {
      return;
    }
    return string;
  }
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
    //$('screen#calculate helper').removeClass('hide');
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
