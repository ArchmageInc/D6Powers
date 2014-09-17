/*global angular */

(function(ng){
  ng.module('D6App', [
    'ngRoute',
    'firebase',
  ])
  .value(
    'FirebaseUrl',
    'https://resplendent-inferno-5462.firebaseio.com/D6Powers'
  )
  .config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider,$locationProvider) {
      'use strict';
      
      $routeProvider
        .when('/',{
          controller:   'HomeCtlr',
          templateUrl:  '/D6App/views/app/home.html'
        }).when('/login',{
          templateUrl:  '/D6App/views/app/login.html' 
        }).when('/new',{
          templateUrl:  '/D6App/views/app/new.html'
        }).when('/view/:uid/:id',{
          templateUrl:  '/D6App/views/app/character.html'
        }).otherwise({
          redirectTo: '/'
        });
        
        $locationProvider.html5Mode(true);
    }
  ]);
})(angular);