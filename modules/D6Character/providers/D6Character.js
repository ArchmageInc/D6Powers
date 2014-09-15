/*global angular, Math */

(function(ng){
    ng.module('D6Character').factory('D6Character',[
      '$q',
      '$firebaseAuth',
      'D6Utils',
      'D6NameGenerator',
      'D6Sock',
      'D6AttributeList',
      function ($q,$auth,$d6,$nameGenerator,Sock,AttributeList){
        'use strict';
        
        function getPromise(character){
          var promises;
          if(character.id){
            character.attributes  = new AttributeList(character.attributes);
            promises  = {};
          }else{
            promises = {
              "name": $nameGenerator.fullName(character.gender).then(function($name){
                character.name = $name;
                return character.name;
              }),
              "alias": $nameGenerator.alias(character.gender).then(function($name){
                character.alias = $name;
                return character.alias;
              }),
              "occupation": $nameGenerator.occupation().then(function($occupation){
                character.occupation  = $occupation;
                return character.occupation;
              }),
              "id": character.$sock._uniqueId().then(function(uid){
                character.id  = uid;
                return character.id;
              }),        
              "attributes": AttributeList.getAttributes().then(function(attributes){
                character.attributes  = new AttributeList(attributes);
                return character.attributes;
              })
            };
          }
          
          return $q.all(promises);
        }
                        
        function D6Character($character){
          var character   = this;
          
          ng.extend(this,{
            id:               null,
            name:             "",
            alias:            "",
            occupation:       "",
            archetype:        "Adventurer",
            species:          "Human",
            gender:           ["Male","Female"][Math.round(Math.random())],
            powerLevel:       2,
            age:              Math.round(Math.random()*15+20),
            height:           Math.round(Math.random()+5)+"'"+Math.round(Math.random()*11)+"\"",
            weight:           Math.round(Math.random()*150)+90,
            fatePoints:       0,
            kaPoints:         0,
            characterPoints:  0,
            bodyPoints:       20,
            physicalDamage:   1,
            movement:         10,
            funds:            0,
            spentPoints:      24,
            attributes:       null,
            powers:           [],
            advantages:       [],
            disadvantages:    [],
            player:           {
              displayName:  $auth.user.displayName,
              uid:          $auth.user.uid
            }
          },$character);
          
          $d6.addD6Properties(this,{
            "revisions":  [],
            "rw:loading": true,
            "rw:$sock":   new Sock('characters/'+character.player.uid),
            "editable":   (character.player.uid===$auth.user.uid),
            "rw:new":     character.created===undefined
          });
          
          getPromise(this).finally(function(){
            character.loading = false;
          });
        }
        
        $d6.addD6Properties(D6Character.prototype,{
          "length": undefined,
          "save":   function(){
            var character     = this;
            character.loading = true;
            return character.$sock.save(character).then(function($character){
              character.loading  = false;
              return character;
            });
          },
          "remove": function(){
            var character     = this;
            character.loading = true;
            return character.$sock.remove(character).then(function($character){
              character.loading  = false;
              return character;
            });
          }
        });
        
        $d6.addD6Properties(D6Character,{
          "get": function($userId,$characterId){
            var $sock = new Sock('characters/'+$userId+"/");
            return $sock.get($characterId).then(function($character){
              var character   = new D6Character($character);
              return character;
            });
          }
        });
        
        
        return D6Character;
      }
    ]);
})(angular);