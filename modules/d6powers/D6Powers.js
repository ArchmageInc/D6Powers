/*global angular */

(function(ng){
  var FirebaseUrl = 'https://resplendent-inferno-5462.firebaseio.com/D6Powers';
  
  var app = ng.module('D6Powers', [
    'ngRoute',
    'firebase',
    'FirebaseAuth'
  ]);
  app.value('FirebaseUrl',FirebaseUrl);
  app.config([
    '$routeProvider',
    '$firebaseAuthProvider',
    function ($routeProvider,$firebaseAuthProvider) {
      'use strict';

      $firebaseAuthProvider.setUrl(FirebaseUrl);

      $routeProvider
        .when('/',{
          templateUrl:  'modules/d6powers/views/character.html'
        }).when('/login',{
          templateUrl:  'modules/d6powers/views/login.html' 
        }).otherwise({
          redirectTo: '/'
        });
    }
  ]);
})(angular);