/*global angular */

(function(ng){
    ng.module('D6Character').controller('AttributeCtlr',[
        '$scope',
        'D6Utils',
        function AttributeController($scope,$d6){
            'use strict';
            
            function onChangeRank(newValue,oldValue){
              if(newValue>$scope.attribute.max){
                $scope.attribute.rank = $scope.attribute.max;
              }
            }
            
            $scope.$watch('attribute.rank',onChangeRank);
        }
    ]);
})(angular);