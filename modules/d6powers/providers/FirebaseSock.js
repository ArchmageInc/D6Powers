/*global ng */

(function(ng){
    ng.module('D6Powers').service('$firebaseSock',[
      '$firebase',
      '$filter',
      'FirebaseUrl',
      function($firebase,$filter,firebaseUrl){
        'use strict';
        
        return function(apiEnd){
          var Ref  = new Firebase(firebaseUrl+"/"+apiEnd+"/");
          
          var getBy  = function(queryObject,extrapolate){
            extrapolate = extrapolate===true;
            return $firebase(Ref).$asArray().$loaded().then(function($array){
              if(!queryObject && !extrapolate){
                return $array;
              }
              var results   = $filter('filter')($array,queryObject);
              if(!extrapolate){
                return results;
              }
              var $objects  = [];
              if(results.length){
                var object  = results[0];
                var promise = get(object);
                for(var i=1;i<results.length;i++){
                  object  = results[i];
                  promise = promise.then(function($object){
                    $objects.push($object);
                    return get(object);
                  });
                }
                promise = promise.then(function($object){
                  $objects.push($object);
                  return $objects;
                });
                return promise;
              }
              
              return $objects;
            });
          };
          
          var get  = function(object){
            var id  = object.id || object.$id || object;
            return $firebase(Ref.child(id)).$asObject().$loaded().then(function($result){
              ng.extend(object,$result);
              return $result;
            });
          };
          
          var remove = function($object){
            if(!$object.$inst){
              return get($object).then(function($object){
                return remove($object);
              });
            }
            
            return $object.$inst().$remove();
          };
          
          var save  = function($object){
            if($object.new){
              delete $object.new;
              $object.updated = Date.now();
              return $firebase(Ref).$set($object.id,$object);
            }
            
            if(!$object.$save){
              var object  = $object;
              return get($object).then(function($object){
                ng.extend($object,object);
                return save($object);
              });
            }
            
            return $object.$save();
          };
          
          var _uniqueId = function(){
            return $firebase(Ref).$push().then(function(ref){
              return ref.name();
            });
          };
          
          return  {
            get:        get,
            getBy:      getBy,
            remove:     remove,
            save:       save,
            _uniqueId:  _uniqueId
          };
          
        };
      }
    ]);
})(angular);