/*global angular */

(function(ng){
    ng.module('D6App').filter('unique',[
      function(){
        function UniqueFilter(input,field){
          var found   = [];
          var result  = [];
          ng.forEach(input,function(value,key){
            if(found.indexOf(value[field])===-1){
              found.push(value[field]);
              result.push(value);
            }
          });
          return result;
        }
        
        return UniqueFilter;
      }
    ]);
})(angular);