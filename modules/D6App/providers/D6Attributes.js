/*global angular */

(function(ng){
    'use strict';
    ng.module('D6Powers').factory('d6Attributes',[
      '$filter',
      'D6Sock',
      'D6Attribute',
      'D6Skill',
      function($filter,$firebaseSock,Attribute,Skill){
        
        var applyProperty = function(obj,prop,value){
          var getFunc = value;
          if(typeof value!=="function"){
            getFunc = function(){
              return value;
            };
          }
          Object.defineProperty(obj,prop,{
            enumerable:   false,
            configurable: false,
            get:  getFunc
          });
        };
        
        function AttributeList(attributes){
          var attributeList = this;
          ng.forEach(attributes,function(attribute){
            attributeList[attribute.name]  = new Attribute(attribute.name);
          });
        }
        applyProperty(AttributeList.prototype,'length',function(){
          return Object.keys(this).length;
        });
        
        function SkillList(attribute,skills){
          var skillList = this;
          ng.forEach(skills,function(skill){
            skillList[skill.name]  = new Skill(attribute,skill.name);
          });
        }
        applyProperty(SkillList.prototype,'length',function(){
          return Object.keys(this).length;
        });
        
        var $sock           = new $firebaseSock('attributes');
        var $allAttributes  = $sock.getBy();
        var $allSkills      = $allAttributes.then(function($attributes){
          var skills  = [];
          for(var i=0;i<$attributes.length;i++){
            ng.forEach($attributes[i].skills,function(skill){
              skills.push(skill);
            });
          }
          return skills;
        });
        
        var listAttributes  = function(filter){
          return $allAttributes.then(function($attributes){
            return $filter('filter')($attributes,filter);
          });
        };
        var getAttribute  = function(attributeName){
          return $sock.get(attributeName);
        };
        var listSkills  = function(filter){
          return $allSkills.then(function(skills){
            return $filter('filter')(skills,filter);
          });
        };
        var getSkill  = function(skillName){
          return $allAttributes.then(function($attributes){
            for(var i=0;i<$attributes.length;i++){
              var attribute = $attributes[i];
              if(attribute.skills[skillName]){
                return $sock.get(attribute.name+"/skills/"+skillName);
              }
            }
          });
        };
        
        var newAttributeList  = function(){
          return listAttributes().then(function($attributes){
            return new AttributeList($attributes);
          });
        };
        var newSkillList  = function(attribute,skills){
          return new SkillList(attribute,skills);
        };
        
        var $d6Attributes = {
          getAttribute:     getAttribute,
          getSkill:         getSkill,
          listAttributes:   listAttributes,
          listSkills:       listSkills,
          newAttributeList: newAttributeList,
          newSkillList:     newSkillList,
          applyProperty:    applyProperty
        };
        
        return $d6Attributes;
        
      }]);
 })(angular);