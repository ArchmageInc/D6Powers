/*global angular, Math */

(function(ng,$Math){
    ng.module('D6App').factory('D6Character',[
      '$q',
      'D6Auth',
      'D6Utils',
      'D6NameGenerator',
      'D6Sock',
      'D6AttributeList',
      function ($q,$auth,$d6,$nameGenerator,Sock,AttributeList){
        'use strict';
        
        function clearChanges(character){
          ng.extend(character.controls,{
              "revision":   0,
              "changes":    false,
              "loading":    false,
              "editing":    false,
              "redoing":    false,
              "undoing":    false,
              "invalid":    false
            });
            character.addRevision();
        }
        
        function generate(character){
          var promises  = {};
          if(character.id){
            character.attributes  = new AttributeList(character.attributes);
            clearChanges(character);
          }else{
            ng.extend(character,{
              age:    $Math.round($Math.random()*15+20),
              height: $Math.round($Math.random()+5)+"'"+$Math.round($Math.random()*11)+"\"",
              weight: $Math.round($Math.random()*150)+90,
              gender: ["Male","Female"][$Math.round($Math.random())]
            });
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
          var $this = this;
          ng.extend($this,{
            id:               null,
            name:             "",
            alias:            "",
            occupation:       "",
            archetype:        "Adventurer",
            species:          "Human",
            gender:           "",
            powerLevel:       2,
            age:              0,
            height:           "0'0",
            weight:           0,
            fatePoints:       0,
            kaPoints:         0,
            characterPoints:  0,
            bodyPoints:       0,
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
          
          $d6.addD6Properties($this,{
            "controls":     {
              "revisions":  [],
              "revision":   0,
              "changes":    true,
              "loading":    true,
              "editing":    false,
              "redoing":    false,
              "undoing":    false,
              "invalid":    false
            },
            "rw:$sock":     new Sock('characters/'+$this.player.uid),
            "editable":     ($this.player.uid===$auth.user.uid),
            "rw:new":       $this.created===undefined
          });
          
          $this.controls.loading  = generate($this).then(function(){
            $this.addRevision();
            return $this;
          }).finally(function(){
            $this.controls.loading = false;
          });
        }
        
        $d6.addD6Properties(D6Character.prototype,{
          "length": undefined,
          "save":   function(){
            var $this = this;
            if($this.editable){
              $this.controls.loading  = true;
              return $this.$sock.save($this).then(function(){
                clearChanges($this);
                return $this;
              });
            }
          },
          "remove": function(){
            var $this = this;
            if($this.editable){
              $this.controls.loading  = true;
              return $this.$sock.remove($this).then(function(){
                clearChanges($this);
                return $this;
              });
            }
          },
          "regenerate": function(){
            var $this = this;
            if($this.editable && $this.new){
              $this.controls.loading  = true;
              $this.id                = null;
              return generate($this).then(function(){
                clearChanges($this);
                $this.controls.changes  = true;
                return $this;
              });
            }
          },
          "edit": function(){
            var $this = this;
            $this.controls.editing  = ($this.editable && !$this.editing);
          },
          "undoAll": function(){
            var $this = this;
            clearChanges($this);
            $d6.log.warn("Character Undo All not implemented");
          },
          "undo": function(){
            var $this = this;
            var clone = $this.controls.revisions[$this.controls.revision-2];
            if(clone){
              $this.controls.undoing  = true;
              $this.controls.revision--;
              $d6.extend($this,clone);
            }
          },
          "redo": function(){
            var $this = this;
            var clone = $this.controls.revisions[$this.controls.revision];
            if(clone){
              $this.controls.redoing  = true;
              $this.controls.revision++;
              $d6.extend($this,clone);
            }
          },
          "addRevision": function(){
            var $this = this;
            if($this.controls.undoing || $this.controls.redoing || !$this.controls.editing){
              $this.controls.undoing  = false;
              $this.controls.redoing  = false;
              return;
            }
            $this.controls.changes  = $this.controls.revision>0;
            if($this.controls.revision<$this.controls.revisions.length){
              $this.controls.revisions.splice($this.controls.revision,$this.controls.revisions.length);
            }
            $this.controls.revisions.push($d6.clone($this));
            $this.controls.revision = $this.controls.revisions.length;
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
})(angular,Math);