/*global angular */

(function(ng){
    ng.module('D6Powers').controller('CharacterCtlr',[
        '$scope',
        'd6Character',
        function($scope,$character){
            'use strict';
            
            $scope.character  = new $character();
            console.log($scope.character)
            
        }
    ]);
})(angular);