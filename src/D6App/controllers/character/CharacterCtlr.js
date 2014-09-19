/*global angular */

(function(ng){
    ng.module('D6App').controller('CharacterCtlr',[
        '$scope',
        'D6Utils',
        function CharacterController($scope,$d6){
            'use strict';
           
            var watchers  = [];
            
            function onChangePhysique(newPhysiqueRank,oldPhysiqueRank){
              if(oldPhysiqueRank && newPhysiqueRank && !isNaN(newPhysiqueRank)){
                $scope.character.bodyPoints = 20+$d6.roll(Number(newPhysiqueRank));
              }
            }
            
            function onDigest(){
              if($scope.character && $scope.character.controls.editing){
                
                var oldCharacter  = $scope.character.controls.revisions[$scope.character.controls.revision-1];
                var newCharacter  = $d6.clone($scope.character);
                
                var diff          = $d6.diff(oldCharacter,newCharacter);
                if(diff.newValue.length){                  
                  $scope.character.addRevision();                  
                }
              }
            }
            
            function unwatchCharacter(){
              while(watchers.length){
                watchers.pop()();
              }
            }
            
            watchers.push($scope.$watch('character.attributes.Physique.rank',onChangePhysique));
            
            watchers.push($scope.$watch(onDigest));
            
            $scope.$on('$destroy',unwatchCharacter);
        }
    ]);
})(angular);