/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Skill',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          controller:   'SkillCtlr',
          templateUrl:  '/D6App/views/character/skill.html',
          scope:  {
            'skill':    '=d6Scope',
            'controls': '=d6Controls'
          }
        };
      }
  ]);
})(angular);