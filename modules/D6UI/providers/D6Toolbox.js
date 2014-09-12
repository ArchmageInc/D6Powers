/*global angular */

(function(ng){
    'use strict';
    ng.module('D6UI').factory('D6Toolbox',[
      'D6Tool',
      function(Tool){
        
        function D6Toolbox(){
          this.tools  = [];
        }
        D6Toolbox.prototype = {
          add:  function(tool,index){
            if(ng.isArray(tool)){
              for(var i=0;i<tool.length;i++){
                this.add(tool[i],index);
              }
              return;
            }
            index = index || 0;
            if(!(tool instanceof Tool)){
              return;
            }
            if(this.tools.indexOf(tool)===-1){
              this.tools.splice(index,0,tool);
            }
          },
          remove: function(tool){
            if(ng.isArray(tool)){
              for(var i=0;i<tool.length;i++){
                this.remove(tool[i]);
              }
              return;
            }
            var index = this.tools.indexOf(tool);
            if(index!==-1){
              this.tools.splice(index,1);
            }
          }
        };
        
        return (new D6Toolbox());
        
      }]);
 })(angular);