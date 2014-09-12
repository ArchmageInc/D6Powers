/*global angular, Math */

(function(ng){
    ng.module('D6Character').factory('D6Character',[
      '$firebaseAuth',
      'D6Sock',
      'D6AttributeList',
      function ($auth,Sock,AttributeList){
        'use strict';
        var defaultCharacter  = function(){
          return {
            id:               null,
            name:             "",
            occupation:       "",
            archetype:        "",
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
            spentPoints:      24
          };
        };
        
        
        
        function D6Character(){
          var character   = this;
          
          ng.extend(this,defaultCharacter(),{
            attributes:     null,
            powers:         [],
            advantages:     [],
            disadvantages:  []
          });
        
          this.$sock._uniqueId().then(function(uid){
            character.id  = uid;
          });
          
          AttributeList.getAttributes().then(function(attributes){
            character.attributes  = new AttributeList(attributes);
          });
        
          this.player = {
            displayName:  $auth.user.displayName,
            uid:          $auth.user.uid
          };
          
        }
        
        D6Character.prototype = {
          $sock: new Sock('characters/'+$auth.user.uid+'/'),
          save: function(){
            this.$sock.save();
          }
        };
        
        return D6Character;
      }
    ]);
})(angular);