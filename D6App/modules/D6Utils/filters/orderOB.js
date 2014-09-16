/*global angular */

(function(ng){
    ng.module('D6Utils').filter('orderOB',[
      function(){
        var toArray = function(items){
          var list =  [];
          ng.forEach(items,function(item){
            list.push(item);
          });
          return list;
        };
        
        var getProp = function(object,fieldMap){
          var prop  = object;
          try{
            for(var i=0;i<fieldMap.length;i++){
              prop  = prop[fieldMap[i]];
            }
          }catch(ex){}
          return prop;
        };
        return function(items,field,reverse){
          var filtered  = toArray(items);
          var fields    = field.split('.');
          filtered.sort(function(a,b){
            return getProp(a,fields) > getProp(b,fields) ? 1 : -1;
          });
          if(reverse){
            filtered.reverse();
          }
          return filtered;
        };
      }
    ]);
})(angular);