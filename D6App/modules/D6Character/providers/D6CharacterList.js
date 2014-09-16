/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6CharacterList',[
      '$firebaseAuth',
      'D6Utils',
      'D6Sock',
      'D6Character',
      function($auth,$d6,Sock,Character){
        'use strict';
                
        function CharacterList(userId){
          userId  = userId || $auth.user.uid;
          var characterList = this;
          
          $d6.addD6Properties(this,{
            "$sock":      new Sock('characters/'+userId),
            "rw:loading": true
          });
          
          this.$sock.get().then(function($characters){
            ng.forEach($characters,function($character){
              characterList[$character.$id] = new Character($character);
            });
            characterList.loading = false;
          });
        }
        $d6.addD6Properties(CharacterList.prototype,{
          "length": undefined,
        });
        
        return CharacterList;
      }
    ]);
})(angular);