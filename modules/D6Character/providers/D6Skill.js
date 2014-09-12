/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6Skill',[
      'D6Utils',
      'D6Sock',
      function($d6,Sock){
        'use strict';
                
        var defaultSkill  = {
          rank:       0,
          pips:       0,
          $skill:     null
        };
        
        function D6Skill(attribute,skillName){
          var $sock       = new Sock('attributes/'+attribute.name+'/skills');
          var skill       = this;
          this.name       = skillName;
          this.attribute  = attribute.name;
          ng.extend(this,defaultSkill,{
            specializations: []
          });
          $sock.get(skillName).then(function($skill){
            $d6.addD6Property(skill,'$skill',$skill);
          },function(reason){
            console.log("Invalid skill: "+reason);
          });
        }
        
        return D6Skill;
      }
    ]);
})(angular);