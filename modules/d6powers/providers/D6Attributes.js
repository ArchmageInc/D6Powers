/*global angular */

(function(ng){
    'use strict';
    ng.module('D6Powers').service('d6Attributes',[
      '$firebaseSock',
      'd6Skills',
      function($firebaseSock,$d6Skills){
        
        var $sock             = new $firebaseSock('attributes');
        
        var allPromise  = $sock.getBy();
        
        var generate  = function($attribute){
          var attribute     = ng.extend($attribute,{
            rank:   1,
            pips:   0,
            skills: []
          });
          $d6Skills.getBy({attribute:$attribute.name}).then(function($skills){
            for(var i=0;i<$skills.length;i++){
              attribute.skills.push($d6Skills.generate($skills[i]));
            }
          });
          
          return attribute;
        };
        
        var $d6Attributes = {
          list:     allPromise,
          generate: generate
        };
        
        return $d6Attributes;
        
      }]);
 })(angular);