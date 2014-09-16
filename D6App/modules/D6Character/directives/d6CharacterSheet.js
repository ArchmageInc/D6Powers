/*global angular */

(function(ng){
  ng.module('D6Character').directive('d6CharacterSheet',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          controller:   'CharacterCtlr',
          templateUrl:  '/D6App/views/character/character-sheet.html',
          scope:  {
            'characterId':      '=d6CharacterId',
            'characterUserId':  '=d6UserId'
          }
        };
      }
  ]);
})(angular);