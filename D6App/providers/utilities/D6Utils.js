/*global angular, Math, Object */

(function(ng,$Math,$Object){
    ng.module('D6App').factory('D6Utils',[
      '$log',
      function($log){
        'use strict';
        
        function D6GetLength(){
          return $Object.keys(this).length;
        };
        
        function D6Property(object,property,value){
          var getter;
          var config  = {
            enumerable:   false,
            configurable: false
          };
          if(property.match(/rw:/i) && !property.match(/get:/i)){
            config.writable = true;
          }
          property  = property.replace(/rw:/i,"");
          
          if(typeof value==="function" && property.match(/get:/i)){
            getter    = value;
            value     = undefined;
            property  = property.replace(/get:/i,"");
          }else if(value===undefined && object[property]!==undefined){
            value = object[property];
            delete object[property];
          }
          
          if(getter){
            config.get  = getter;
          }else if(property==="length"){
            config.get  = D6GetLength;
          }else{
            config.value    = value;
          }
          
          $Object.defineProperty(object,property,config);
          return object;
        }
        
        function D6Properties(object,properties){
          ng.forEach(properties,function(value,property){
            D6Property(object,property,value);
          });
          return object;
        }
        
        function D6GetFromPath(object,fullPath,parents){
          parents   = parents || 0;
          var paths = fullPath.split('.');
          try{
            for(var i=0;i<paths.length-parents;i++){
              object  = object[paths[i]];
            }
          }catch(ex){}
          return {
            nextPath: paths[paths.length-parents],
            paths:    paths.splice(paths.length-parents,parents),
            target:   object
          };
        }
        
        function D6GetFlatPaths(object,preKey){
          preKey    = preKey || "";
          var paths = [];
          ng.forEach(object,function(property,key){
            key = preKey+"."+key.replace(" ","\\ ");
            if(typeof property==="object"){
              paths = paths.concat(D6GetFlatPaths(property,key));
            }else if((typeof property!=="function")){
              paths.push(key);
            }
          });
          return paths;
        }
        
        function D6DeepClone(object){
          var obj = {};
          function applyProperty(child,property){
            if(typeof child==="object"){
              obj[property] = D6DeepClone(child);
            }else{
              obj[property] = child;
            }
          }
          ng.forEach(object,applyProperty);
          return obj;
        }
        function D6DeepExtend(){
          var obj = arguments[0];
          function applyProperty(child,property){
            if(typeof child==="object"){
              obj[property] = D6DeepExtend(child);
            }else if(typeof child!=="function"){
              obj[property] = child;
            }
          }
          for(var i=1;i<arguments.length;i++){
            ng.forEach(arguments[i],applyProperty);
          }
          return obj;
        }
        
        function D6Roll(number,explode,previous){
          previous  = previous || 0;
          var result  = $Math.round($Math.random()*5)+1;
          if(number>1){
            number  =   number-1;
            result  =  D6Roll(number,explode,result+previous);
            return result;
          }
          
          if(result===6 && explode!==false){
            var exp = D6Roll(1);
            result  +=  exp;
          }
          
          return result+previous;
        };
                
        var D6Utils = {
          roll:             D6Roll,
          addD6Property:    D6Property,
          addD6Properties:  D6Properties,
          getFlatPaths:     D6GetFlatPaths,
          getFromPath:      D6GetFromPath,
          clone:            D6DeepClone,
          extend:           D6DeepExtend,
          log:  {
            info:   $log.info,
            warn:   $log.warn,
            error:  $log.error
          }
        };
        
        return D6Utils;
      }
    ]);
})(angular,Math,Object);