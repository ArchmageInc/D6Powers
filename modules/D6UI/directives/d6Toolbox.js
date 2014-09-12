/*global angular */

(function(ng){
  ng.module('D6UI').directive('d6Toolbox',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  'modules/D6UI/views/toolbox.html',
          controller:   'ToolboxCtlr'
        };
      }
  ]);
})(angular);