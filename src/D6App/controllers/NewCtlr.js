/*global angular */

(function(ng){
    ng.module('D6App').controller('NewCtlr',[
        '$scope',
        'D6Toolbox',
        'D6CharacterTools',
        'D6Character',
        function($scope,$toolbox,CharacterTools,Character){
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
          var character   = new Character();
          var tools       = new CharacterTools(character,confirmations);
          
          
          $toolbox.add(tools.tools);
          
          $scope.character      = character;
          $scope.confirmations  = confirmations;
        }
    ]);
})(angular);