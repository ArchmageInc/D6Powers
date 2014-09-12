/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6AttributeList',[
      '$filter',
      'D6Utils',
      'D6Sock',
      'D6Attribute',
      function($filter,$d6,Sock,Attribute){
        'use strict';
        
        
        var getAttributes = function(filter){
          var $sock = new Sock('attributes');
          return $sock.get(filter);
        };
        
        function AttributeList(attributes){
          var attributeList = this;
          ng.forEach(attributes,function(attribute){
            attributeList[attribute.name]  = new Attribute(attribute.name);
          });
        }
        $d6.addD6Property(AttributeList.prototype,'length');
        $d6.addD6Property(AttributeList,'getAttributes',getAttributes);
        
        return AttributeList;
      }
    ]);
})(angular);