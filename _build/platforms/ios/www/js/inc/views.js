// views.js
// v2.0.0

var views = {
  initialize : function(){
    'use strict';
    views.showScreen('calculate');
  },
  showScreen : function(screenID){
    'use strict';
    $('screen').addClass('hidden');
    screens[screenID].show();
  }
};

var screens = {
  calculate : {
    show : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        screens.calculate.remE().done(screens.calculate.addE);
        $('screen#calculate').removeClass('hidden');
        setTimeout(function(){
          'use strict';
          $('screen#calculate helper').addClass('hide');
        },5000);
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
        $('screen#calculate #btn_menu').hammer().off('tap');
        $('screen#calculate .touchable').hammer().off('tap');
        f.resolve();
      }).promise();
    },
    addE : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
        $('screen#calculate #btn_menu').hammer().on('tap',function(){
          $('screen #btn_menu').addClass('spinFaceUp');
          setTimeout(menu.show,300);
        });
        $('screen#calculate mortgage-calculation summary .touchable').hammer().on('tap', function(){
          'use strict';
          var currentSelection = $('screen#calculate mortgage-calculation .touchable.selected').length == 0 ? '' : $('screen#calculate mortgage-calculation .touchable.selected')[0].tagName;
          //check if the same opbject is tapped twice
          if (currentSelection == $(this)[0].tagName){
            //if so, hide the selector and show the calculation only
            $('screen#calculate mortgage-calculation .touchable').removeClass('selected');
            $('screen#calculate user-input numberpad').addClass('hide');
            $('screen#calculate user-input frequency-selector').addClass('hide');
          } else {
            //if not, then switch to that selector
            $('screen#calculate mortgage-calculation .touchable').removeClass('selected');
            $(this).toggleClass('selected');
            l.p($(this)[0].tagName.toLowerCase(),1);
            switch($(this)[0].tagName.toLowerCase()){
              case 'principal':
                $('screen#calculate user-input numberpad').addClass('hide');
                $('screen#calculate user-input numberpad.principal').removeClass('hide');
                $('screen#calculate user-input frequency-selector').addClass('hide');
                break;
              case 'down':
                $('screen#calculate user-input numberpad').addClass('hide');
                $('screen#calculate user-input numberpad.down').removeClass('hide');
                $('screen#calculate user-input frequency-selector').addClass('hide');
                break;
              case 'amortization':
                $('screen#calculate user-input numberpad').addClass('hide');
                $('screen#calculate user-input numberpad.amortization').removeClass('hide');
                $('screen#calculate user-input frequency-selector').addClass('hide');
                break;
              case 'rate':
                $('screen#calculate user-input numberpad').addClass('hide');
                $('screen#calculate user-input numberpad.rate').removeClass('hide');
                $('screen#calculate user-input frequency-selector').addClass('hide');
                break;
              case 'frequency':
                $('screen#calculate user-input numberpad').addClass('hide');
                $('screen#calculate user-input frequency-selector').removeClass('hide');
                break;
              default:
                $('screen#calculate user-input numberpad').addClass('hide');
                $('screen#calculate user-input frequency-selector').addClass('hide');
            }
          }
        });
        $('screen#calculate numberpad key').hammer().on('tap', function(){
          'use strict';
          //DEBUG
          l.s($(this).data('value'),1);
        });
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
};

var modals = {
  login : {
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
};