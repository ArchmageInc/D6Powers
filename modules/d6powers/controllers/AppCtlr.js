/*global angular */

(function(ng){
    ng.module('D6Powers').controller('AppCtlr',[
        '$scope',
        '$firebaseAuth',
        '$location',
        function($scope,$firebaseAuth,$location){
            'use strict';
            
            var checkAuthPath = function(){
              if(!$firebaseAuth.user.authenticated){
                $location.path('/login');
              }else if($location.path()=="/login"){
                $location.path('/home');
              }
            };
            
            $scope.$watch('auth.user.authenticated',checkAuthPath);
            $scope.$on('$locationChangeStart',checkAuthPath);
            
            $scope.auth = $firebaseAuth;
        }
    ]);
})(angular);