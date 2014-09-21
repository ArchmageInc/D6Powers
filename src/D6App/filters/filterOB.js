/*global angular */

(function(ng){
    ng.module('D6App').filter('filterOB',[
      function(){
        function isMatch(item,filter){
          var result  = true;
          ng.forEach(filter,function(value,key){
            if(value && item[key]!==value){
              result=false;
            }
          });
          return result;
        }
        function FilterOB(input,filter){
          var result  = [];
          ng.forEach(input,function(item){
            if(isMatch(item,filter)){
              result.push(item);
            }
          });
          return result;
        }
        
        return FilterOB;
      }
    ]);
})(angular);