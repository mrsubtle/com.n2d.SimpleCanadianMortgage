// touch.js
// v2.0.0

var touch = {
  addE: function(){
    return $.Deferred(function(f){
      $('.touchable').on('mousedown touchstart',function(){
        $('.touched').removeClass('touched');
        $(this).addClass('touched');
      });
      $('.touchable').on('mouseup touchend touchcancel',function(){
        $('.touched').removeClass('touched');
      });
      f.resolve();
    }).promise();
  },
  remE: function(){
    return $.Deferred(function(f){
      $('.touchable').off('mousedown touchstart');
      $('.touchable').off('mouseup touchend touchcancel');
      f.resolve();
    }).promise();
  },
  initialize: function(){
    touch.remE().done( touch.addE );
  },
  reset: function(){
    touch.initialize();
  }
};