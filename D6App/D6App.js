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
          controller:   'NewCtlr',
          templateUrl:  '/D6App/views/app/view.html'
        }).when('/view/:uid/:id',{
          controller:   'ViewCtlr',
          templateUrl:  '/D6App/views/app/view.html'
        }).otherwise({
          redirectTo: '/'
        });
        
        $locationProvider.html5Mode(true);
    }
  ]);
})(angular);