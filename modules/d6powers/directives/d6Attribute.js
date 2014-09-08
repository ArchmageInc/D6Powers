/*global angular */

(function(ng){
  ng.module('D6Powers').directive('d6Attribute',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  'modules/d6powers/views/attribute.html',
          scope:  {
            'attribute': '=d6Scope'
          }
        };
      }
  ]);
})(angular);