/*global angular */

(function(ng){
  ng.module('D6UI').directive('d6Dialog',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/D6App/views/ui/dialog.html',
          transclude:   true,
          scope:  {
            'confirmation': '=d6Confirm'
          }
        };
      }
  ]);
})(angular);