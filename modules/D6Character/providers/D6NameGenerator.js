/*global angular */

(function(ng){
    ng.module('D6Character').factory('D6NameGenerator',[
      'D6Utils',
      'D6Sock',
      function($d6,Sock){
        'use strict';
        
        var $sock   = new Sock('names');
        var all     = $sock.get().then(function($names){
          var names = {};
          for(var i=0;i<$names.length;i++){
            names[$names[i].$id]  = $names[i];
          }
          return names;
        });
        
        function getRandomName($names,prev){
          var rand  = Math.round(Math.random()*($names.length-1));
          var name  = $names[rand].$value || $names[rand];
          while(name===prev){
            rand  = Math.round(Math.random()*($names.length-1));
            name  = $names[rand].$value || $names[rand];
          }
          return name;
        }
        
        function getUniqeRandoms(total,start,end,prev){
          prev      = prev  || [];
          var rand  = Math.round(Math.random()*(end-start))+start;
          while(prev.indexOf(rand)!==-1){
            rand  = Math.round(Math.random()*(end-start))+start;
          }
          prev.push(rand);
          for(var i=1;i<total;i++){
            prev  = prev.concat(getUniqeRandoms(1,start,end,prev));
          }
          return prev;
        }
        
        var D6NameGenerator = {
          fullName: function(gender){
            gender  = ["Male","Female"].indexOf(gender)!==-1 ? gender : "Male";
            return all.then(function($names){
              return getRandomName($names.full[gender]);
            });
          },
          alias: function(gender){
            gender  = ["Male","Female"].indexOf(gender)!==-1 ? gender : "Male";
            return all.then(function($names){
              return getRandomName($names.aliases[gender].concat($names.aliases.Both));
            });
          },
          sillyName:  function(){
            return all.then(function($names){
              var firstName = getRandomName($names.silly);
              var lastName  = getRandomName($names.silly,firstName);
              return firstName+" "+lastName;
            });
          },
          occupation: function(){
            var rand  = Math.round(Math.random()*7549);
            var $occupationSock = new Sock('occupations');
            return $occupationSock.get(rand).then(function($name){
              return $name.$value;
            });
          }
        };
        
        /*
        var names = [];
        function findName(data){
          var name  = "";
          $('a.plain',data).each(function(i,el){name  += " "+$(el).text()});
          names.push(name.trim())
        }
        for(var i=0;i<200;i++){$.ajax({url:"http://www.behindthename.com/random/random.php?number=1&gender=m&surname=&randomsurname=yes&all=yes",success:findName})}
        */
       /*
       function findName(data){
         var matches  = data.match(/yourname.+?</);
         if(matches.length){
           var name = matches[0].replace(/^.+>/,"").replace(/</,"")
         }
         names.push(name);
       }
       for(var i=0;i<400;i++){
       $.ajax({
         url: "http://superhero.namegeneratorfun.com/",
         success: findName,
         type: 'POST',
         dataType: "text",
         data:{
           "ctl00$ctl00$ScriptManager1": "ctl00$ctl00$Content$Form$SimpleAjaxForm1$FormUpdatePanel|ctl00$ctl00$Content$Form$SimpleAjaxForm1$GeneratorButton",
           "ctl00$ctl00$Content$Form$SimpleAjaxForm1$ChooseRadioButton": "random",
           "ctl00$ctl00$Content$Form$SimpleAjaxForm1$GenderRadioButton": "F",
           "ctl00$ctl00$Content$Share$Paste1$UrlBox": "http://superhero.namegeneratorfun.com",
           "ctl00$ctl00$Content$Form$SimpleAjaxForm1$GeneratorButton": "Generate Superhero Name",
           "__ASYNCPOST": true,
           "__VIEWSTATE": "/wEPDwUKLTk0MjExNDgzNGRk/S0LJ3zx+KBQEvw77TGeOMl+mZpNpPSYicWboCr6a3E="
         }
       });
     }
     */
    /*
    var names=[];
    function findName(data){
      var str = $('cmd',data)[0].childNodes[0].data;
      var $el=$(str.substring(1,str.length));
      $('li',$el).each(function(i,el){names.push($(el).text())});
    }
    for(var i=0;i<400;i++){
    $.ajax({
         url: "http://www.mithrilandmages.com/utilities/Occupation.php",
         success: findName,
         type: 'POST',
         data:{
           "xjxfun": "RandomOccupations",
           "xjxr": "1410745892561",
           "xjxargs[]": "S25"
         }
       });
     }
      */ 
       
       
       
        return D6NameGenerator;
      }
    ]);
})(angular);