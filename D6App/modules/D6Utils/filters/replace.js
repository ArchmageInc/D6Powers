/*global angular */

(function(ng){
    ng.module('D6Utils').filter('replace',[
      function(){
        
        function ReplaceFilter(input,find,replace){
          var regex = new RegExp(find,"g");
          return input.replace(regex,replace);
        }
        
        return ReplaceFilter;
      }
    ]);
})(angular);