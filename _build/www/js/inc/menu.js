// menu.js
// v2.0.0

var menu = {
  initialize : function(){
    $('menu').addClass('menu-left');
    $('app').removeClass('tiltBack');
    menu.remE().done( menu.addE );
  },
  show : function(){
    console.log('Showing Menu');
    $('app').addClass('tiltBack');
    $('menu').removeClass('menu-left');
    $('.touched').removeClass('touched');
    $('app screen').not('.hidden').each(function(i,v){
      window['screens'][$(v).attr('id')]['remE']();
    });
    $('app').hammer().on('tap', function(){
      menu.hide();
    });
  },
  hide : function(){
    console.log('Hiding Menu');
    $('app').hammer().off('tap');
    $('menu').addClass('menu-left');
    $('app').removeClass('tiltBack');
    $('app screen').not('.hidden').each(function(i,v){
      window['screens'][$(v).attr('id')]['addE']();
    });
    setTimeout(function(){
      $('.spinFaceUp').removeClass('spinFaceUp');
      $('.touched').removeClass('touched');
    },300);
  },
  remE : function(){
    return $.Deferred(function(f){
      f.resolve();
    }).promise();
  },
  addE : function(){
    return $.Deferred(function(f){
      f.resolve();
    }).promise();
  }
};