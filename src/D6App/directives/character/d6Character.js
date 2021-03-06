/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Character',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/views/character/character.html',
          scope:  {
            'character':  '=d6Scope'
          }
        };
      }
  ]);
})(angular);