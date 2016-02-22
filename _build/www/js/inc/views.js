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
  login : {},
  signup : {},
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
        $('screen#calculate .touchable').hammer().off('tap');
        f.resolve();
      }).promise();
    },
    addE : function(){
      'use strict';
      return $.Deferred(function(f){
        'use strict';
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
              case('frequency'):
                $('screen#calculate user-input numberpad').addClass('hide');
                $('screen#calculate user-input frequency-selector').removeClass('hide');
                break;
              default:
                $('screen#calculate user-input numberpad').removeClass('hide');
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
}