/*global angular */

(function(ng){
    'use strict';
    ng.module('D6UI').factory('D6Tool',[
      function(){
        
        function D6Tool(properties){          
          ng.extend(this,properties);
        }
        D6Tool.prototype  = {
          icon:         'blocked',
          name:         'Tool',
          description:  '',
          show:         function(){return true;},
          disable:      function(){return false;},
          use:          function(){}
        };
        
        return D6Tool;
        
      }]);
 })(angular);