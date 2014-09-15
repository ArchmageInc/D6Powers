/*global angular,Date */

(function(ng){
    ng.module('D6Data').factory('D6Sock',[
      '$firebase',
      '$filter',
      'FirebaseUrl',
      'D6Utils',
      function($firebase,$filter,firebaseUrl,$d6){
        'use strict';
        
        function D6Sock(apiEnd){
          $d6.addD6Property(this,'$sock',$firebase(new Firebase(firebaseUrl+"/"+apiEnd+"/")));
          
        };
        D6Sock.prototype={
          get:  function(query,extrapolate){
            extrapolate = extrapolate===true;
            var $sock   = this.$sock;
            if(typeof query==="function"){
              query = query();
            }
            if(typeof query==="string" || typeof query==="number"){
              return $firebase($sock.$ref().child(String(query))).$asObject().$loaded();
            }else{
              return $sock.$asArray().$loaded().then(function($array){
                if(!query && !extrapolate){
                  return $array;
                }
                var results = $filter('filter')($array,query);
                if(!extrapolate){
                  if(results.length===1){
                    return results[0];
                  }
                  return results;
                }
                var objects = [];
                for(var i=0;i<results.length;i++){
                  var $object = $array.$getRecord($array.$keyAt(results[i]));
                  objects.push($object);
                }
                if(objects.length===1){
                  return objects[0];
                }
                return objects;
              });
            }
          },
          remove: function(object){
            var id  = object.$id || object.id;
            if(!id){
              return false;
            }
            return this.$sock.$remove(id);
          },
          save: function(object){
            var id  = object.$id || object.id;
            
            if(object.new || !object.created){
              delete object.new;
              object.updated =  Date.now();
              object.created  = Date.now();
            }
            return this.$sock.$set(id,object);
            
          },
          _uniqueId: function(){
            return this.$sock.$push().then(function(Ref){
              return Ref.name();
            });
          }
        };
        
        return D6Sock;
      }
    ]);
})(angular);