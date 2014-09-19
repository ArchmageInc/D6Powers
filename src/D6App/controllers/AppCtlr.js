/*global angular */

(function(ng){
    ng.module('D6App').controller('AppCtlr',[
      '$scope',
      '$location',
      'D6Auth',
      function($scope,$location,$auth){
        'use strict';

        var lastPath  = "/";

        function checkAuth(){
          if(!$auth.user.authenticated && $location.path()!=='/login'){
            lastPath  = $location.url();
            $location.path('/login');
          }else if($auth.user.authenticated && $location.path()==="/login"){
            $location.url(lastPath);
          }
        }

        function setLastPath(){
          if($location.path()!=='/login'){
            lastPath  = $location.url();
          }
        }

        $scope.$on('$locationChangeSuccess',setLastPath);
        $scope.$watch('user.authenticated',checkAuth);
        $scope.$on('$locationChangeStart',checkAuth);

        $scope.user = $auth.user;
            
      }
    ]);
})(angular);