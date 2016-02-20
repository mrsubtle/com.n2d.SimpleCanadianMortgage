// views.js
// v2.0.0

var v = {
  initialize : function(){
    'use strict';
    v.showScreen('calculate');
  },
  showScreen : function(screenID){
    'use strict';
    $('screen').addClass('hidden');
    $('screen#'+screenID).removeClass('hidden');
  }
};

var screens = {
  login : {},
  signup : {},
  calculate : {
    show : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        f.resolve();
      }).promise();
    },
    hide : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        f.resolve();
      }).promise();
    },
    remE : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        f.resolve();
      }).promise();
    },
    addE : function(){
      'use strict';
      return $.Deferred(function(f){
        f.resolve();
      }).promise();
    }
  },
  template : {
    show : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        f.resolve();
      }).promise();
    },
    hide : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        f.resolve();
      }).promise();
    },
    remE : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        f.resolve();
      }).promise();
    },
    addE : function(){
      'use strict';
      return $.Deferred(function(f){
        f.resolve();
      }).promise();
    }
  },
}