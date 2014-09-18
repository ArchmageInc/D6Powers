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
            
            $scope.tools  = $toolbox.tools;
            
            $scope.$on('$locationChangeSuccess',emptyToolbox);
        }
    ]);
})(angular);