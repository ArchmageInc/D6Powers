/*global angular */

(function(ng){
  ng.module('D6Powers').directive('d6Skill',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  'modules/d6powers/views/skill.html',
          scope:  {
            'skill': '=d6Scope'
          }
        };
      }
  ]);
})(angular);