/*global angular */

(function(ng){
    ng.module('D6App').factory('D6CharacterTools',[
      '$window',
      '$q',
      'D6Tool',
      function D6CharacterToolsFactory($window,$q,Tool){
        'use strict';
         
        function D6CharacterTools(character,confirmations){

          this.tools = [
            new Tool({
             icon:         'spinner5',
             name:         'Regenerate',
             description:  'Regenerate Character',
             show: function(){
               return character.new;
             },
             use:  function(){
               if(character.controls.changes){
                 var def   = $q.defer();
                 def.promise.then(function(){
                   character.regenerate();
                 }).finally(function(){
                   confirmations.abort.confirmation  = null;
                 });
                 confirmations.abort.confirmation = def;
               }else{
                 character.regenerate();
               }
             }
           }),

           new Tool({
             icon:         'blocked',
             name:         'cancel',
             description:  "Cancel Changes",
             show: function(){
               return character.controls.editing;
             },
             use: function(){
               if(character.controls.changes){
                 var def   = $q.defer();
                 def.promise.then(function(){
                   character.undoAll();
                 }).finally(function(){
                   confirmations.abort.confirmation  = null;
                 });
                 confirmations.abort.confirmation = def;
               }else{
                 character.undoAll();
               }
             }
           }),

           new Tool({
             icon:         'undo',
             name:         'undo',
             description:  'Undo Change',
             show: function(){
               return character.controls.editing;
             },
             disable: function(){
               return character.controls.revision<=1;
             },
             use:  function(){
               character.undo();
             }
           }),

           new Tool({
             icon:         'redo',
             name:         'redo',
             description:  'Redo Change',
             show: function(){
               return character.controls.editing;
             },
             disable: function(){
               return character.controls.revision>=character.controls.revisions.length;                
             },
             use: function(){
               character.redo();
             }
           }),

           new Tool({
             icon:         'disk',
             name:         'save',
             description:  'Save Character',
             show: function(){
               return character.editable;
             },
             disable: function(){
               return !character.controls.changes;
             },
             use: function(){
               character.save();
             }
           }),

           new Tool({
             icon:         'pencil',
             name:         'edit',
             description:  'Edit Character',
             show: function(){
               return !character.controls.editing && character.editable;
             },
             use: function(){
               character.edit();
             }
           }),

           new Tool({
             icon:         'remove2',
             name:         'delete',
             description:  "Delete Character",
             show: function(){
               return character.controls.editing && character.editable;
             },
             disable: function(){
               return character.new;
             },
             use: function(){
               var def   = $q.defer();
               def.promise.then(function(){
                 character.remove();
               }).finally(function(){
                 confirmations.remove.confirmation = null;
               });
               confirmations.remove.confirmation = def;
             }
           }),

           new Tool({
             icon:         'print',
             name:         'print',
             description:  "Print Character",
             show: function(){
               return !character.controls.editing;
             },
             use: function(){
               $window.print();
             }
           })
          ];
        };
         
        D6CharacterTools.prototype={
          tools: []
        };
         
        return D6CharacterTools;
      }
    ]);
})(angular);