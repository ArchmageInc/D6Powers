/*global angular */

(function(ng){
    ng.module('D6App').controller('AppCtlr',[
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
            
            $scope.characterId      = "-JWu5oeIQB5wSoXavhQb";
            $scope.characterUserId  = "google:100388415844532364293";
            
        }
    ]);
})(angular);