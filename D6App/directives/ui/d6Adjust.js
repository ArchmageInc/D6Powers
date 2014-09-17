/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Adjust',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/D6App/views/ui/adjust.html',
          transclude:    true,
          scope:  {
            'target':    '=d6Scope',
          }
        };
      }
  ]);
})(angular);