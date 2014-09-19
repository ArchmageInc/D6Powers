/*global angular */

(function(ng){
    ng.module('D6App').factory('D6Toolbox',[
      'D6Utils',
      'D6Tool',
      function($d6,Tool){
        'use strict';
        
        function D6Toolbox(){
          var $this = this;
          this.tools  = [
            new Tool({
              icon:         'menu',
              name:         'Menu',
              show: function(){
                return $this.tools.length>1;
              }
            })
          ];
          this.open = false;
        }
        $d6.addD6Properties(D6Toolbox.prototype,{
          add:  function(tool){
            if(ng.isArray(tool)){
              for(var i=0;i<tool.length;i++){
                this.add(tool[i]);
              }
              return;
            }
            if(!(tool instanceof Tool)){
              return;
            }
            if(this.tools.indexOf(tool)===-1){
              this.tools.push(tool);
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
          },
          empty: function(){
            this.tools.splice(1,this.tools.length);
            this.open = false;
          },
          toggle: function(){
            this.open = !this.open;
          },
          useTool: function(tool){
            this.toggle();
            tool.use();
          }
        });
        
        return (new D6Toolbox());
        
      }]);
 })(angular);