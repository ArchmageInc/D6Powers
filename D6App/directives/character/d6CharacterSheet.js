/*global angular */

(function(ng){
  ng.module('D6App').directive('d6CharacterSheet',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          controller:   'CharacterCtlr',
          templateUrl:  '/D6App/views/character/character-sheet.html',
          scope:  {
            'character':      '=d6Scope',
          }
        };
      }
  ]);
})(angular);