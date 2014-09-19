/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Attribute',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          controller:   'AttributeCtlr',
          templateUrl:  '/views/character/attribute.html',
          scope:  {
            'attribute': '=d6Scope',
            'controls':  '=d6Controls'
          }
        };
      }
  ]);
})(angular);