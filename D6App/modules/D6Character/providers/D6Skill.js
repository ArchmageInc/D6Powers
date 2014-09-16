/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6Skill',[
      'D6Utils',
      'D6Sock',
      function($d6,Sock){
        'use strict';
                   
        function D6Skill(attribute,skillName,$skill){
          var skill       = this;
          var $sock       = new Sock('attributes/'+attribute.name+'/skills');
          ng.extend(this,{
            name:     skillName,
            attribute: attribute.name,
            rank:     0,
            pips:     0
          },$skill);
          $d6.addD6Property(skill,'attribute');
          $sock.get({name:skillName}).then(function($skill){
            $d6.addD6Property(skill,'description',$skill.description);
          });
        }
        
        return D6Skill;
      }
    ]);
})(angular);