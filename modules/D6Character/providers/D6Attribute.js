/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6Attribute',[
      'D6Utils',
      'D6Sock',
      'D6SkillList',
      function($d6,Sock,SkillList){
        'use strict';
        
        var $sock   = new Sock('attributes');
        
        var defaultAttribute  = {
          rank:       1,
          pips:       0,
          $attribute: null
        };
        
        function D6Attribute(attributeName){
          var attribute = this;
          this.name     = attributeName;
          ng.extend(this,defaultAttribute);
          $sock.get(attributeName).then(function($attribute){
            $d6.addD6Property(attribute,'$attribute',$attribute);
            SkillList.getSkills({attribute:attributeName}).then(function($skills){
              attribute.skills  = new SkillList(attribute,$skills);
            });
          },function(reason){
            console.log("Invalid attribute: "+reason)
          });
          
        }
        
        return D6Attribute;
      }
    ]);
})(angular);