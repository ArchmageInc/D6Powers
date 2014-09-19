/*global angular, Math */

(function(ng,$Math){
    ng.module('D6App').factory('D6Attribute',[
      'D6Utils',
      'D6Sock',
      'D6SkillList',
      function($d6,Sock,SkillList){
        'use strict';
        
        var $sock   = new Sock('attributes');
        
        function D6Attribute(attributeName,$attribute){
          var $this = this;
          ng.extend(this,{
            rank: 1,
            pips: 0,
            name: attributeName
          },$attribute);
          $d6.addD6Properties($this,{
            "rw:max":  5
          });
          $sock.get({name:attributeName}).then(function($attribute){
            $d6.addD6Property($this,'description',$attribute.description);
            $this.skills  = new SkillList($this,$this.skills);
          });
        }
        $d6.addD6Properties(D6Attribute.prototype,{
          "adjust": function(adjPips){
            var newRank,newPips,totalPips;
            if(!adjPips || isNaN(adjPips=parseInt(adjPips))){
              return;
            }
            totalPips = $Math.max(0,adjPips+this.pips+this.rank*4);
            newRank   = $Math.min(this.max,$Math.floor(totalPips/4));
            newPips   = newRank===this.max ? 0 : totalPips%4;
            this.rank = newRank;
            this.pips = newPips;
          }
        });
        return D6Attribute;
      }
    ]);
})(angular,Math);