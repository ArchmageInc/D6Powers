/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Toolbox',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          templateUrl:  '/views/ui/toolbox.html',
          controller:   'ToolboxCtlr',
          link: function($scope,$el,attrs){
            $scope.$watch('toolbox.open',function(newValue){
              if(newValue){
                $el.addClass('open');
              }else{
                $el.removeClass('open');
              }
            });
          }
        };
      }
  ]);
})(angular);