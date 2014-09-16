/*global angular */

(function(ng){
    ng.module('D6Character').controller('AttributeCtlr',[
        '$scope',
        'D6Utils',
        function AttributeController($scope,$d6){
            'use strict';
            
            function onChangeRank(newValue){
              if(newValue>$scope.attribute.max){
                $scope.attribute.rank = $scope.attribute.max;
                $scope.attribute.pips = 0;
              }
            }
            
            function onChangePips(newValue){
              if(newValue>3){
                $scope.attribute.pips = 0;
                $scope.attribute.rank++;
              }
              if(newValue<0){
                $scope.attribute.pips = 3;
                $scope.attribute.rank--;
              }
              if($scope.attribute.rank>=$scope.attribute.max){
                $scope.attribute.pips   = 0;
                $scope.attribute.rank   = $scope.attribute.max;
                $scope.controls.invalid = true;
              }
              if($scope.attribute.rank<1){
                $scope.attribute.rank   = 1;
                $scope.attribute.pips   = 0;
                $scope.controls.invalid = true;
              }
            }
            
            
            $scope.$watch('attribute.rank',onChangeRank);
            $scope.$watch('attribute.pips',onChangePips);
        }
    ]);
})(angular);