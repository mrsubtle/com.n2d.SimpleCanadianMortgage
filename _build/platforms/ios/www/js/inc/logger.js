// logger.js
// v2.0.0

var l = {
  //session log
  s : function(content, type){
    'use strict';
    if(typeof content == 'Object'){
      content = JSON.stringify(content, null, 4);
    }
    switch(type){
      case 1:
      console.warn(content);
      break;
      case 2:
      console.error(content);
      break;
      default:
      console.log(content);
    }
  },
  //persistent log
  p : function(content, type){
    'use strict';
    if(typeof content == 'Object'){
      content = JSON.stringify(content, null, 4);
    }
    switch(type){
      case 1:
      console.warn(content);
      break;
      case 2:
      console.error(content);
      break;
      default:
      console.log(content);
    }
  },
};