/*global angular */

(function(ng){
    ng.module('D6Powers').service('d6Character',[
      '$filter',
      'd6Attributes',
      function($filter,$d6Attributes){
        'use strict';
        
        var defaultCharacter  = {
          name:             "",
          occupation:       "",
          archetype:        "",
          species:          "Human",
          gender:           "Male",
          powerLevel:       2,
          age:              20,
          height:           "5'7\"",
          weight:           140,
          fatePoints:       0,
          kaPoints:         0,
          characterPoints:  0,
          bodyPoints:       0,
          physicalDamage:   1,
          movement:         10,
          funds:            0,
          spentPoints:      24
        };
        
        return function(){
          var character = ng.extend({
            attributes:     [],
            powers:         [],
            advantages:     [],
            disadvantages:  [],
          },defaultCharacter);
          $d6Attributes.list.then(function($attributes){
            for(var i=0;i<$attributes.length;i++){
              var attribute = $d6Attributes.generate($attributes[i]);
              character.attributes.push(attribute);
            }
          });
          return character;
        };
        
      }
    ]);
})(angular);