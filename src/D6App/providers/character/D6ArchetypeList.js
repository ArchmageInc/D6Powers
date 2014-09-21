/*global angular */

(function(ng){
    ng.module('D6App').factory('D6ArchetypeList',[
      'D6Utils',
      'D6Sock',
      function($d6,Sock){
        'use strict';
        
        var $sock = new Sock('archetypes');
        
        function ArchetypeList(){
          var $this = this;
          var promise = $sock.get().then(function($archetypes){
            ng.forEach($archetypes,function($archetype){
              $this[$archetype.name]  = $archetype;
              return $this;
            });
          });
          $d6.addD6Properties($this,{
            "loaded": promise
          });
        }
        $d6.addD6Properties(ArchetypeList.prototype,{
          'length':     undefined,
          'getRandom':  function(){
            var $this = this;
            return $this.loaded.then(function(){
              var rand  = Math.round(Math.random()*($this.length-1));
              var i     = 0;
              var archetype;
              for(var key in $this){
                archetype = $this[key];
                i++;
                if(i>=rand){
                  return archetype;
                }
              }
            });
          }
        });
        
        return new ArchetypeList();
      }
    ]);
})(angular);