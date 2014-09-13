/*global angular */

(function(ng){
    ng.module('D6Character').controller('SkillCtlr',[
        '$scope',
        'D6Utils',
        function SkillController($scope,$d6){
            'use strict';
            
            function onChangeRank(newValue,oldValue){
              
            }
            
            $scope.$watch('skill.rank',onChangeRank);
        }
    ]);
})(angular);