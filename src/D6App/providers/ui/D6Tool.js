/*global angular */

(function(ng){
    ng.module('D6App').factory('D6Tool',[
      function(){
        'use strict';
        
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