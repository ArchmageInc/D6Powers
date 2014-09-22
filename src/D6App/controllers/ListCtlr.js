/*global angular */

(function(ng){
    ng.module('D6App').controller('ListCtlr',[
        '$scope',
        '$routeParams',
        'D6CharacterList',
        function($scope,$routeParams,CharacterList){
          'use strict';
          
          $scope.characters = new CharacterList($routeParams.uid);
        }
    ]);
})(angular);