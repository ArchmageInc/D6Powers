/*global angular */

(function(ng){
    ng.module('D6App').factory('D6Attribute',[
      'D6Utils',
      'D6Sock',
      'D6SkillList',
      function($d6,Sock,SkillList){
        'use strict';
        
        var $sock   = new Sock('attributes');
        
        function D6Attribute(attributeName,$attribute){
          var attribute = this;
          ng.extend(this,{
            rank: 1,
            pips: 0,
            name: attributeName,
            max:  5
          },$attribute);
          $d6.addD6Property(attribute,'max');
          $sock.get({name:attributeName}).then(function($attribute){
            $d6.addD6Property(attribute,'description',$attribute.description);
            attribute.skills  = new SkillList(attribute,attribute.skills);
          });
        }
        
        return D6Attribute;
      }
    ]);
})(angular);