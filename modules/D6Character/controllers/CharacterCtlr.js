/*global angular */

(function(ng){
    ng.module('D6Character').controller('CharacterCtlr',[
        '$scope',
        'D6Utils',
        'D6Toolbox',
        'D6Character',
        function($scope,$d6,$toolbox,Character){
            'use strict';
            
            function BodyPointWatcher(newPhysiqueRank,oldPhysiqueRank){
              if(!newPhysiqueRank){
                return;
              }
              $scope.character.bodyPoints = 20+$d6.roll(newPhysiqueRank);
            }
            
            $toolbox.add(['save','edit']);
            
            $scope.character  = new Character();
            
            $scope.$watch('character.attributes.Physique.rank',BodyPointWatcher);
            
        }
    ]);
})(angular);