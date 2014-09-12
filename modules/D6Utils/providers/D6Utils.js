/*global angular */

(function(ng){
    ng.module('D6Utils').factory('D6Utils',[
      'D6Property',
      function(D6Property){
        'use strict';
        
        var D6Utils = {
          addD6Property: D6Property
        };
        
        
        return D6Utils;
      }
    ]);
})(angular);