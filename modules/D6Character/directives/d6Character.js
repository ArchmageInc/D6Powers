/*global angular */

(function(ng){
  ng.module('D6Character').directive('d6Character',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          controller:   'CharacterCtlr',
          templateUrl:  'modules/D6Character/views/character.html',
          scope:  {
            'characterId':      '=d6CharacterId',
            'characterUserId':  '=d6UserId'
          }
        };
      }
  ]);
})(angular);