/*global angular */

(function(ng){
    ng.module('D6Character').controller('CharacterCtlr',[
        '$scope',
        'D6Toolbox',
        'D6Character',
        function($scope,$toolbox,Character){
            'use strict';
            
            $toolbox.add(['save','edit']);
            
            $scope.character  = new Character();
            
            console.log($scope.character)
            
        }
    ]);
})(angular);