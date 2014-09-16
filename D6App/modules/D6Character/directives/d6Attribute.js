/*global angular */

(function(ng){
  ng.module('D6Character').directive('d6Attribute',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          controller:   'AttributeCtlr',
          templateUrl:  '/D6App/views/character/attribute.html',
          scope:  {
            'attribute': '=d6Scope',
            'controls':  '=d6Controls'
          }
        };
      }
  ]);
})(angular);