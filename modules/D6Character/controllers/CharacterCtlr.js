/*global angular */

(function(ng){
    ng.module('D6Character').controller('CharacterCtlr',[
        '$scope',
        'D6Utils',
        'D6Toolbox',
        'D6Tool',
        'D6Character',
        function($scope,$d6,$toolbox,Tool,Character){
            'use strict';
            
            function BodyPointWatcher(newPhysiqueRank,oldPhysiqueRank){
              if(newPhysiqueRank && !isNaN(newPhysiqueRank)){
                $scope.character.bodyPoints = 20+$d6.roll(Number(newPhysiqueRank));
              }
            }
            
            $scope.character  = new Character();
            $scope.controls   = {
              editing:  false,
              changes:  false
            };
            
            $scope.$watch('character.attributes.Physique.rank',BodyPointWatcher);
            
            var tools = [
              new Tool({
                icon: 'disk',
                name: 'save',
                description:  'Save Character',
                show: function(){
                  return $scope.controls.editing;
                },
                use:  function(){
                  $scope.character.save();
                }
              }),
              new Tool({
                icon: 'pencil',
                name: 'edit',
                description: 'Edit Character',
                show: function(){
                  return !$scope.controls.editing;
                },
                use: function(){
                  $scope.controls.editing = true;
                }
              })
            ];
            
            $toolbox.add(tools);
            
            
        }
    ]);
})(angular);