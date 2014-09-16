/*global angular */

(function(ng){
  ng.module('D6UI').directive('d6Toolbox',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/D6App/views/ui/toolbox.html',
          controller:   'ToolboxCtlr'
        };
      }
  ]);
})(angular);