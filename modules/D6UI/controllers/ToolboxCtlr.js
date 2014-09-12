/*global angular */

(function(ng){
    ng.module('D6UI').controller('ToolboxCtlr',[
        '$scope',
        'D6Toolbox',
        function($scope,$toolbox){
            'use strict';
            
            $scope.tools  = $toolbox.tools;
        }
    ]);
})(angular);