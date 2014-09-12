/*global angular */

(function(ng){
    ng.module('D6Utils').factory('D6Property',[
      function(){
        'use strict';
        var getLength = function(){
          return Object.keys(this).length;
        };
        
        return function(object,property,value,getter){
          var config  = {
            enumerable:   false,
            configurable: false
          };
          if(value===undefined && object[property]!==undefined){
            value = object[property];
            delete object[property];
          }
          
          if(property==="length"){
            config.get  = getLength;
          }else if(typeof getter==="function"){
            config.get  = value;
          }else{
            config.writable = false;
            config.value    = value;
          }
          Object.defineProperty(object,property,config);
          return object;
        };
      }
    ]);
})(angular);