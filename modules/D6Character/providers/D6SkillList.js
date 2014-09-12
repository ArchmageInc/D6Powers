/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6SkillList',[
      '$filter',
      'D6Utils',
      'D6Sock',
      'D6Skill',
      function($filter,$d6,Sock,Skill){
        'use strict';
        
        
        var getSkills = function(filter){
          var $sock = new Sock('attributes');
          return $sock.get().then(function($attributes){
            var skills = [];
            ng.forEach($attributes,function($attribute){
              ng.forEach($attribute.skills,function(skill){
                skills.push(skill);
              });
            });
            return $filter('filter')(skills,filter);
          });
        };
        
        function SkillList(attribute,skills){
          var skillList = this;
          ng.forEach(skills,function(skill){
            skillList[skill.name]  = new Skill(attribute,skill.name);
          });
        }
        $d6.addD6Property(SkillList.prototype,'length');
        $d6.addD6Property(SkillList,'getSkills',getSkills);
        
        return SkillList;
      }
    ]);
})(angular);