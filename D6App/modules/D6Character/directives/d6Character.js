/*global angular */

(function(ng){
  ng.module('D6Character').directive('d6Character',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/D6App/views/character/character.html',
          scope:  {
            'character':  '=d6Scope'
          }
        };
      }
  ]);
})(angular);