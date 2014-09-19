/*global angular */

(function(ng){
    ng.module('D6App').controller('SkillCtlr',[
        '$scope',
        'D6Utils',
        function SkillController($scope,$d6){
            'use strict';
            
            function onChangeRank(newValue){
              if(newValue<0){
                $scope.skill.rank       = 0;
                $scope.skill.pips       = 0;
                $scope.controls.invalid = true;
              }
            };
            
            function onChangePips(newValue){
              if(newValue>3){
                $scope.skill.pips = 0;
                $scope.skill.rank++;
              }
              if(newValue<0){
                $scope.skill.pips = 3;
                $scope.skill.rank--;
              }
              if($scope.skill.rank<0){
                $scope.skill.rank       = 0;
                $scope.skill.pips       = 0;
                $scope.controls.invalid = true;
              }
            }
            
            $scope.$watch('skill.rank',onChangeRank);
            $scope.$watch('skill.pips',onChangePips);
        }
    ]);
})(angular);