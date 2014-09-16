/*global angular */

(function(ng){
  var app = ng.module('D6App', [
    'ngRoute',
    'FirebaseAuth',
    'D6Data',
    'D6Utils',
    'D6UI',
    'D6Character'
  ]);
  app.config([
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