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
            if(ng.isArray(child)){
              obj[property] = [];
              for(var i=0;i<child.length;i++){
                obj[property][i]  = D6DeepClone(child[i]);
              }
            }else if(typeof child==="object"){
              obj[property] = D6DeepClone(child);
            }else{
              obj[property] = child;
            }
          }
          if(ng.isArray(object)){
            obj = [];
            for(var i=0;i<object.length;i++){
              obj[i]  = D6DeepClone(object[i]);
            }
            return obj;
          }else if(typeof object==="object"){
            ng.forEach(object,applyProperty);
            return obj;
          }
          return object;
        }
        function D6DeepExtend(){
          var obj = arguments[0];
          function applyProperty(child,property){
            if(typeof child==="object" && typeof obj[property]==="object"){
              D6DeepExtend(obj[property],child);
            }else{
              obj[property] = D6DeepClone(child);
            }
          }
          for(var i=1;i<arguments.length;i++){
            ng.forEach(arguments[i],applyProperty);
          }
          return obj;
        }
        
        function FromD6Diff(diff,reference){
          if(!diff instanceof Diff){
            D6Utils.log.warn("Invalid diff object");
            return;
          }
          if(!reference){
            D6Utils.log.warn("Invalid reference object for diff");
            return;
          }
          
          return D6DeepExtend({},reference,diff.oldValue,diff.newValue);
        }
        
        function Diff(){};
        D6Property(Diff.prototype,'length');
        function D6Diff(obj1,obj2){
          var diff      = new Diff();
          var oldValue  = new Diff();
          var newValue  = new Diff();
         
          var cdiff;
          if(obj1===obj2){
            return diff;
          }
          
          ng.forEach(obj1,function(child,key){
            if(!obj2 || obj2[key]===undefined){
              oldValue[key]  = D6DeepClone(child);
            }else if(typeof child==="object" && typeof obj2[key]!=="object"){
              oldValue[key] = D6DeepClone(child);
              newValue[key] = obj2[key];
            }else if(typeof child!=="object" && typeof obj2[key]==="object"){
              oldValue[key]  = child;
              newValue[key] = D6DeepClone(obj2[key]);
            }else if(typeof child==="object" && typeof obj2[key]==="object"){
              cdiff = D6Diff(child,obj2[key]);
              if(cdiff.oldValue.length){
                oldValue[key]  = cdiff.oldValue;
              }
              if(cdiff.newValue.length){
                newValue[key] = cdiff.newValue;
              }
            }else if(child!==obj2[key]){
              oldValue[key]  = child;
              newValue[key] = obj2[key];
            }
          });
          ng.forEach(obj2,function(child,key){
            if(!obj1 || obj1[key]===undefined){
              newValue[key] = D6DeepClone(child);
            }
          });
          diff.oldValue  = oldValue;
          diff.newValue = newValue;
          return diff;
        };
        
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
          diff:             D6Diff,
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