/*global angular */

(function(ng){
  var FirebaseUrl = 'https://resplendent-inferno-5462.firebaseio.com/D6Powers';
  
  var app = ng.module('D6Utils', [
    'FirebaseAuth',
    'D6Data'
  ]);
  app.value('FirebaseUrl',FirebaseUrl);
  app.config([
    '$firebaseAuthProvider',
    function ($firebaseAuthProvider) {
      'use strict';

      $firebaseAuthProvider.setUrl(FirebaseUrl);
    }
  ]);
})(angular);