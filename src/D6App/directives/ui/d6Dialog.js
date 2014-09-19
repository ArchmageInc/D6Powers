/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Dialog',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/views/ui/dialog.html',
          transclude:   true,
          scope:  {
            'control': '=d6Control'
          }
        };
      }
  ]);
})(angular);