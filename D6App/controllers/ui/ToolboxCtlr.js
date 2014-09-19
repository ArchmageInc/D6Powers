/*global angular */

(function(ng){
    ng.module('D6App').controller('ToolboxCtlr',[
        '$scope',
        'D6Toolbox',
        function($scope,$toolbox){
            'use strict';
            
            function emptyToolbox(){
              $toolbox.empty();
            }
            $scope.toolbox  = $toolbox;
            
            $scope.$on('$locationChangeSuccess',emptyToolbox);
        }
    ]);
})(angular);