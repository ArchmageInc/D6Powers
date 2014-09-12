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
    function ($routeProvider) {
      'use strict';

      $routeProvider
        .when('/',{
          templateUrl:  'modules/D6Character/views/character.html'
        }).when('/login',{
          templateUrl:  'modules/D6App/views/login.html' 
        }).otherwise({
          redirectTo: '/'
        });
    }
  ]);
})(angular);