/*global angular */

(function(ng){
    ng.module('D6Character').controller('CharacterCtlr',[
        '$window',
        '$scope',
        '$q',
        'D6Utils',
        'D6Toolbox',
        'D6Tool',
        'D6Character',
        function CharacterController($window,$scope,$q,$d6,$toolbox,Tool,Character){
            'use strict';
            
            var characterWatchers = [];
            
            function CharacterRevision(path,oldValue,newValue){
              this.path     = path;
              this.oldValue = oldValue;
              this.newValue = newValue;
            };
            
            function CharacterWatcher(path){
              this.path   = path;
              this.cancel = $scope.$watch(path,function(newValue,oldValue){
                if(newValue===oldValue || newValue===null || oldValue===null){
                  return;
                }
                if($scope.controls.invalid){
                  //console.log("["+$scope.controls.revision+"] "+path+": "+newValue+" - invalid")
                  /*
                   * An invalid change may affect more than one revision as each change is it's own revision
                   * For example A skill is increased from 2D+3. The pips change to 0, and the rank changes to 3
                   * This is a problem.
                   */
                  $scope.character.revisions.pop();
                  $scope.controls.revision--;
                }
                if($scope.controls.invalid || $scope.controls.undoing || $scope.controls.redoing || !$scope.controls.editing){
                  $scope.controls.undoing = false;
                  $scope.controls.redoing = false;
                  $scope.controls.invalid = false;
                  return;
                }
                
                if($scope.controls.revision<$scope.character.revisions.length){
                  $scope.character.revisions.splice($scope.controls.revision,$scope.character.revisions.length-$scope.controls.revision);
                }
                $scope.character.revisions.push(new CharacterRevision(path,oldValue,newValue));
                //console.log("["+$scope.controls.revision+"] "+path+": "+newValue)
                $scope.controls.revision++;

                $scope.controls.changes =  true;
              });
            }
            function unwatchCharacter(){
              while(characterWatchers.length){
                characterWatchers.pop().cancel();
              }
            }
            function applyCharacterWatch(){
              unwatchCharacter();
              
              ng.forEach($d6.getFlatPaths($scope.character,'character'),function(path){
                characterWatchers.push(new CharacterWatcher(path));
              });
            };
            
            function onChangePhysique(newPhysiqueRank){
              if(newPhysiqueRank && !isNaN(newPhysiqueRank)){
                $scope.character.bodyPoints = 20+$d6.roll(Number(newPhysiqueRank));
              }
            }
            
            function onChangeLoad(newLoading){
              $scope.controls.loading = newLoading;
            }
            
            function undoChanges(){
              while(undo());
              $scope.character.revisions.splice(0,$scope.character.revisions.length);
              $scope.controls.editing = false;
              $scope.controls.changes = false;
            };
            
            function undo(){
              $scope.controls.revision--;
              
              if($scope.character.revisions.length==0 || $scope.controls.revision<0){
                $scope.controls.revision  = 0;
                $scope.controls.changes   = false;
                return false;
              }
              
              var revision                    = $scope.character.revisions[$scope.controls.revision];
              var object                      = $d6.getFromPath($scope,revision.path,1);
              
              object.target[object.nextPath]  = revision.oldValue;
              
              $scope.controls.undoing         = true;
              $scope.controls.changes         = $scope.controls.revision ? $scope.controls.changes : false;
              
              return true;
            };
            function redo(){
              if($scope.controls.revision>=$scope.character.revisions.length){
                $scope.controls.revision  = $scope.character.revisions.length;
                return false;
              }
              
              var revision              = $scope.character.revisions[$scope.controls.revision];
              var object                = $d6.getFromPath($scope,revision.path,1);
              
              object.target[object.nextPath]  = revision.newValue;
              
              $scope.controls.redoing = true;
              $scope.controls.changes = true;
              
              $scope.controls.revision++;
              
              return true;
            }
            
            function removeCharacter(){
              $scope.character.remove().then(function(){
                $scope.controls.editing = false;
                $scope.controls.changes = false;
              });
            };
            
            function saveCharacter(){
              $scope.character.save().then(function(){
                $scope.controls.changes   = false;
                $scope.controls.editing   = false;
                $scope.controls.revision  = 0;
                $scope.character.revisions.splice(0,$scope.character.revisions.length);
              });
            }
            
            function editCharacter(){
              applyCharacterWatch();
              $scope.controls.editing  = true;
              
            }
            
            function closeRemoveDialog(){
              $scope.controls.confirmations.remove  = null;
            }
            
            function closeChangeDialog(){
              $scope.controls.confirmations.changes  = null;
            }
            
            function generateCharacter(){
              unwatchCharacter();
              $scope.character  = new Character();
              ng.extend($scope.controls,{
                editing:  false,
                changes:  false,
                undoing:  false,
                redoing:  false,
                invalid:  false,
                loading:  true,
                revision: 0
              });
            }
            
            
            
            $scope.controls   = {
              editing:  false,
              changes:  false,
              undoing:  false,
              redoing:  false,
              invalid:  false,
              loading:  true,
              revision: 0,
              confirmations:  {
                remove: null,
                changes: null
              }
            };
            
            if($scope.characterUserId && $scope.characterId){
               Character.get($scope.characterUserId,$scope.characterId).then(function($character){
                 $scope.character         = $character;
                 $scope.controls.loading  = $scope.character.loading;
               });
            }else{
              $scope.character        = new Character();
              $scope.controls.loading = $scope.character.loading;
            }
            $scope.$watch('character.attributes.Physique.rank',onChangePhysique);
            $scope.$watch('character.loading',onChangeLoad);
            $scope.$watchCollection('character',applyCharacterWatch);
            
            var tools = [
              new Tool({
                icon: 'spinner5',
                name: 'Regenerate',
                description: 'Regenerate Character',
                show: function(){
                  if($scope.character){
                    return $scope.character.new;
                  }
                  return false;
                },
                disable: function(){
                  if($scope.character){
                    return !$scope.character.new;
                  }
                  return true;
                },
                use:  function(){
                  if($scope.controls.changes){
                    var def   = $q.defer();
                    def.promise.then(generateCharacter).finally(closeChangeDialog);
                    $scope.controls.confirmations.changes = def;
                  }else{
                    generateCharacter();
                  }
                }
              }),
              new Tool({
                icon: 'blocked',
                name: 'cancel',
                description:  "Cancel Changes",
                show: function(){
                  return $scope.controls.editing;
                },
                use: function(){
                  if($scope.controls.changes){
                    var def   = $q.defer();
                    def.promise.then(undoChanges).finally(closeChangeDialog);
                    $scope.controls.confirmations.changes = def;
                  }else{
                    $scope.controls.editing  = false;
                  }
                }
              }),
              new Tool({
                icon: 'undo',
                name: 'undo',
                description:  'Undo Change',
                show: function(){
                  return $scope.controls.changes;
                },
                disable: function(){
                  return $scope.controls.revision<=0;
                },
                use:  undo
              }),
              new Tool({
                icon: 'redo',
                name: 'redo',
                description:  'Redo Change',
                show: function(){
                  return $scope.controls.changes;
                },
                disable: function(){
                  if($scope.character){
                    return $scope.controls.revision>=$scope.character.revisions.length;
                  }
                  
                  return true;                  
                },
                use:  redo
              }),
              new Tool({
                icon: 'disk',
                name: 'save',
                description:  'Save Character',
                show: function(){
                  if($scope.character){
                    return $scope.controls.changes && $scope.character.editable;
                  }
                  return false;
                },
                use:  saveCharacter
              }),
              new Tool({
                icon: 'pencil',
                name: 'edit',
                description: 'Edit Character',
                show: function(){
                  if($scope.character){
                    return !$scope.controls.editing && $scope.character.editable;
                  }
                  return false;
                },
                use: editCharacter
              }),
              new Tool({
                icon: 'remove2',
                name: 'delete',
                description: "Delete Character",
                show: function(){
                  if($scope.character){
                    return $scope.controls.editing && $scope.character.editable && !$scope.character.new;
                  }
                  return false;
                },
                use: function(){
                  var def   = $q.defer();
                  def.promise.then(removeCharacter).finally(closeRemoveDialog);
                  $scope.controls.confirmations.remove = def;
                }
              }),
              new Tool({
                icon: 'print',
                name: 'print',
                description: "Print Character",
                use: function(){
                  $window.print();
                }
              })
            ];
            
            $toolbox.add(tools);
        }
    ]);
})(angular);