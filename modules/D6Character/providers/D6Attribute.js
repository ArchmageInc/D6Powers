/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6Attribute',[
      'D6Utils',
      'D6Sock',
      'D6SkillList',
      function($d6,Sock,SkillList){
        'use strict';
        
        var $sock   = new Sock('attributes');
        
        function D6Attribute(attributeName){
          var attribute = this;
          ng.extend(this,{
            rank: 1,
            pips: 0,
            name: attributeName,
            max:  5
          });
          $d6.addD6Property(attribute,'max');
          $sock.get({name:attributeName}).then(function($attribute){
            $d6.addD6Property(attribute,'description',$attribute.description);
            SkillList.getSkills({attribute:attributeName}).then(function($skills){
              attribute.skills  = new SkillList(attribute,$skills);
            });
          });
          
        }
        
        return D6Attribute;
      }
    ]);
})(angular);