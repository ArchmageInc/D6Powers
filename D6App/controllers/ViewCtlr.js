/*global angular */

(function(ng){
    ng.module('D6App').controller('ViewCtlr',[
        '$scope',
        '$routeParams',
        'D6Toolbox',
        'D6CharacterTools',
        'D6Character',
        function($scope,$routeParams,$toolbox,CharacterTools,Character){
          'use strict';
          var confirmations    = {
            remove: {
              confirmation: null,
              description:  "Initiated upon removal of character"
            },
            abort: {
              confirmation: null,
              description:  "Initiated upon aborting character changes"
            }
          };
          
          Character.get($routeParams.uid,$routeParams.id).then(function(character){
            $scope.character  = character;
            var tools         = new CharacterTools(character,confirmations);
            $toolbox.add(tools.tools);
          });
          
          $scope.confirmations  = confirmations;
          
        }
    ]);
})(angular);