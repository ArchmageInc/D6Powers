/*global angular */

(function(ng){
    ng.module('D6App').factory('D6AttributeList',[
      'D6Utils',
      'D6Sock',
      'D6Attribute',
      function($d6,Sock,Attribute){
        'use strict';
        
        
        var getAttributes = function(filter){
          var $sock = new Sock('attributes');
          return $sock.get(filter);
        };
        
        function AttributeList(attributes){
          var attributeList = this;
          ng.forEach(attributes,function(attribute){
            attributeList[attribute.name]  = new Attribute(attribute.name,attribute);
          });
        }
        $d6.addD6Property(AttributeList.prototype,'length');
        $d6.addD6Property(AttributeList,'getAttributes',getAttributes);
        
        return AttributeList;
      }
    ]);
})(angular);