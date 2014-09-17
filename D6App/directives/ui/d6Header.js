/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Header',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/D6App/views/ui/header.html',
          controller:   'HeaderCtlr'
        };
      }
  ]);
})(angular);