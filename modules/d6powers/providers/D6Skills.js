/*global angular */

(function(ng){
    'use strict';
    ng.module('D6Powers').service('d6Skills',[
      '$firebaseSock',
      function($firebaseSock){
        
        var $sock         = new $firebaseSock('skills');
        
        var generate = function($skill){
          return ng.extend($skill,{
            rank: 0,
            pips: 0,
            specializations: []
          });
        };
        
        
        var $d6Skills = {
          get:      $sock.get,
          getBy:    $sock.getBy,
          generate: generate
        };
        
        return $d6Skills;
        
      }]);
 })(angular);