/*global angular, Math */

(function(ng){
    ng.module('D6Character').factory('D6Character',[
      '$firebaseAuth',
      'D6Utils',
      'D6NameGenerator',
      'D6Sock',
      'D6AttributeList',
      function ($auth,$d6,$nameGenerator,Sock,AttributeList){
        'use strict';
                
        function D6Character(){
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
            new:              true,
            powers:           [],
            advantages:       [],
            disadvantages:    [],
            player:           {
              displayName:  $auth.user.displayName,
              uid:          $auth.user.uid
            }
          });
          $nameGenerator.fullName(character.gender).then(function($name){
            character.name = $name;
          });
          $nameGenerator.alias(character.gender).then(function($name){
            character.alias = $name;
          });
          $nameGenerator.occupation().then(function($occupation){
            character.occupation  = $occupation;
          });
          $d6.addD6Property(this,'revisions',[]);
          
          this.$sock._uniqueId().then(function(uid){
            character.id  = uid;
          });
          
          AttributeList.getAttributes().then(function(attributes){
            character.attributes  = new AttributeList(attributes);
          });
        }
        
        D6Character.prototype = {
          save: function(){
            return this.$sock.save(this);
          },
          remove: function(){
            return this.$sock.remove(this);
          }
        };
        $d6.addD6Property(D6Character.prototype,'$sock',new Sock('characters/'+$auth.user.uid+'/'));
        $d6.addD6Property(D6Character.prototype,'length');
        return D6Character;
      }
    ]);
})(angular);