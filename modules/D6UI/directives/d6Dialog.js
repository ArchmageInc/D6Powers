/*global angular */

(function(ng){
  ng.module('D6UI').directive('d6Dialog',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  'modules/D6UI/views/dialog.html',
          transclude:   true,
          scope:  {
            'confirmation': '=d6Confirm'
          }
        };
      }
  ]);
})(angular);