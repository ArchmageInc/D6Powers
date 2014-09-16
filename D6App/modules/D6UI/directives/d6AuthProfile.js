/*global angular */

(function(ng){
  ng.module('D6UI').directive('d6AuthProfile',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          scope:  {
            'auth':   "=d6Scope"
          },
          templateUrl:  '/D6App/views/ui/auth-profile.html'
        };
      }
  ]);
})(angular);