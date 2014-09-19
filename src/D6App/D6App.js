/*global angular */

(function(ng){
  ng.module('D6App', [
    'ngRoute',
    'firebase',
  ])
  .value(
    'FirebaseUrl',
    'https://d6powers.firebaseio.com/'
  )
  .config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider,$locationProvider) {
      'use strict';
      
      $routeProvider
        .when('/',{
          controller:   'HomeCtlr',
          templateUrl:  '/views/app/home.html'
        }).when('/login',{
          templateUrl:  '/views/app/login.html' 
        }).when('/new',{
          controller:   'NewCtlr',
          templateUrl:  '/views/app/view.html'
        }).when('/view/:uid/:id',{
          controller:   'ViewCtlr',
          templateUrl:  '/views/app/view.html'
        }).otherwise({
          redirectTo: '/'
        });
        
        $locationProvider.html5Mode(true);
    }
  ]);
})(angular);