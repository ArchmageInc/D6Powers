/*global angular, Math */

(function(ng,$Math){
    ng.module('D6App').factory('D6Skill',[
      'D6Utils',
      'D6Sock',
      function($d6,Sock){
        'use strict';
                   
        function D6Skill(attribute,skillName,$skill){
          var skill       = this;
          var $sock       = new Sock('attributes/'+attribute.name+'/skills');
          ng.extend(this,{
            name:     skillName,
            attribute: attribute.name,
            rank:     0,
            pips:     0
          },$skill);
          $d6.addD6Property(skill,'attribute');
          $sock.get({name:skillName}).then(function($skill){
            $d6.addD6Property(skill,'description',$skill.description);
          });
        }
        $d6.addD6Properties(D6Skill.prototype,{
          "adjust": function(adjPips){
            var newRank,newPips,totalPips;
            if(!adjPips || isNaN(adjPips=parseInt(adjPips))){
              return;
            }
            totalPips = $Math.max(0,adjPips+this.pips+this.rank*4);
            newRank   = $Math.floor(totalPips/4);
            newPips   = totalPips%4;
            this.rank = newRank;
            this.pips = newPips;
          }
        });
        
        return D6Skill;
      }
    ]);
})(angular,Math);