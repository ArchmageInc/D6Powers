/*global angular */

(function(ng){
    ng.module('D6App').controller('AppCtlr',[
        '$scope',
        '$firebaseAuth',
        '$location',
        function($scope,$firebaseAuth,$location){
            'use strict';
            
            var lastPath  = "/";
            
            function checkAuth(){
              if(!$firebaseAuth.user.authenticated && $location.path()!=='/login'){
                lastPath  = $location.url();
                $location.path('/login');
              }else if($firebaseAuth.user.authenticated && $location.path()==="/login"){
                $location.url(lastPath);
              }
            }
            
            function setLastPath(){
              if($location.path()!=='/login'){
                lastPath  = $location.url();
              }
            }
            
            $scope.$on('$locationChangeSuccess',setLastPath);
            $scope.$watch('auth.user.authenticated',checkAuth);
            $scope.$on('$locationChangeStart',checkAuth);
            
            $scope.auth = $firebaseAuth;
            
        }
    ]);
})(angular);