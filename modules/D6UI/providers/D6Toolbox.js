/*global angular */

(function(ng){
    'use strict';
    ng.module('D6UI').factory('D6Toolbox',[
      function(){
        
        function Tool(properties){
          this.callbacks  = [];
          ng.extend(this,properties);
        }
        Tool.prototype  = {
          onUse: function(callback){
            if(typeof callback==="function"){
              this.callbacks.push(callback);
            }
          },
          offUse: function(callback){
            var index = this.callbacks.indexOf(callback);
            if(index!==-1){
              this.callbacks.splice(index,1);
            }
          }
        };
        
        var tools = {
          save: new Tool({
            icon: 'disk',
            name: 'save'
          }),
          edit: new Tool({
            icon: 'pencil',
            name: 'edit'
          })
        };
        
        var getToolsByName = function(name){
          var foundTools  = [];
          if(ng.isArray(name)){
            for(var i=0;i<name.length;i++){
              if(tools[name[i]]){
                foundTools.push(tools[name[i]]);
              }
            }
          }else{
            if(tools[name]){
              foundTools.push(tools[name]);
            }
          }
          return foundTools;
        };
        
        var Toolbox = {
          tools:  [],
          add:    function(toolName){
            var tools  = getToolsByName(toolName);
            
            for(var i=0;i<tools.length;i++){
              if(this.tools.indexOf(tools[i])===-1){
                this.tools.push(tools[i]);
              }
            }
            
          },
          remove: function(toolName){
            var tools   =  getToolsByName(toolName);
            
            for(var i=0;i<tools.length;i++){
              var index = this.tools.indexOf(tools[i]);
              if(index!==-1){
                this.tools.splice(index,1);
              }
            }
          }
        };
        
        return Toolbox;
        
      }]);
 })(angular);