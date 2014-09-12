/*global angular */

(function(ng){
    ng.module('D6Utils').factory('D6Utils',[
      'D6Property',
      function(D6Property){
        'use strict';
        
        var roll  = function(number,explode,previous){
          previous  = previous || 0;
          var result  = Math.round(Math.random()*5)+1;
          if(number>1){
            number  =   number-1;
            result  =  roll(number,explode,result+previous);
            return result;
          }
          
          if(result===6 && explode!==false){
            var exp = roll(1);
            result  +=  exp;
          }
          
          return result+previous;
        };
        
        var D6Utils = {
          roll:           roll,
          addD6Property:  D6Property
        };
        
        
        return D6Utils;
      }
    ]);
})(angular);