/*global angular */

(function(ng){
  ng.module('D6Character').directive('d6Attribute',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  'modules/D6Character/views/attribute.html',
          scope:  {
            'attribute': '=d6Scope'
          }
        };
      }
  ]);
})(angular);