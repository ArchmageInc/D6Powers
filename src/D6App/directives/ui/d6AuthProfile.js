/*global angular */

(function(ng){
  ng.module('D6App').directive('d6AuthProfile',[
      function(){
        'use strict';
        return {
          restrict:     'E',
          scope:  {
            'user':   "=d6Scope"
          },
          templateUrl:  '/views/ui/auth-profile.html'
        };
      }
  ]);
})(angular);