/*global angular */

(function(ng){
    ng.module('D6App').controller('HomeCtlr',[
        '$scope',
        'D6CharacterList',
        function($scope,CharacterList){
          'use strict';
          
          $scope.characters = new CharacterList();
        }
    ]);
})(angular);