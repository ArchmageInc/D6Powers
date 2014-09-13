/*global angular */

(function(ng){
  ng.module('D6Character').directive('d6Adjust',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  'modules/D6Character/views/adjust.html',
          transclude:    true,
          scope:  {
            'target':    '=d6Scope',
          }
        };
      }
  ]);
})(angular);