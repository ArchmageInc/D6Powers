/*global angular */

(function(ng){
    ng.module('D6App').controller('HeaderCtlr',[
        '$scope',
        '$location',
        function($scope,$location){
          'use strict';
          
          $scope.path = $location.path();
        }
    ]);
})(angular);