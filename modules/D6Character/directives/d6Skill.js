/*global angular */

(function(ng){
  ng.module('D6Character').directive('d6Skill',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          controller:   'SkillCtlr',
          templateUrl:  'modules/D6Character/views/skill.html',
          scope:  {
            'skill':    '=d6Scope',
            'controls': '=d6Controls'
          }
        };
      }
  ]);
})(angular);