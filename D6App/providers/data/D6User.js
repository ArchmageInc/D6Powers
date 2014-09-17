/* global angular */
(function(ng){
  ng.module('D6App').factory('D6User',[
    '$firebaseSimpleLogin',
    '$firebase',
    'D6Utils',
    'D6Normalizer',
    'FirebaseUrl',
    function D6UserFactory($firebaseSimpleLogin,$firebase,$d6,Normalizer,URL){
      
      var ref       = new Firebase(URL);
      var $auth     = $firebaseSimpleLogin(ref);
      var UsersURL  = URL+"/users/";
      
      function D6User(){
        $d6.addD6Properties(this,{
          "normalizer": new Normalizer(this),
          "rw:$sync":   null
        });
      }
      
      D6User.prototype={
        authenticating: false,
        authenticated:  false,
        loginError:     null,
      };
      $d6.addD6Properties(D6User.prototype,{
        "login":  function(provider){
          var $this           = this;
          this.authenticating = true;
          
          function success($providerData){
            return $this._process($providerData);
          }
          function error(message){
            return $this.logout(message);
          }
          
          if(provider){
            return $auth.$login(provider).then(success,error);
          }
          return $auth.$getCurrentUser().then(success,error);
        },
        "logout": function(error){
          this.loginError     = error || null;
          this.authenticated  = false;
          this.authenticating = false;
          this.save();
          this.normalizer.clear();
          this._setupSync();
          $auth.$logout();
        },
        "save": function(){
          if(this.$sync){
            ng.extend(this.$sync,this);
            return this.$sync.$save();
          }
        },
        "_process":  function($providerData){
          this.authenticating = false;
          
          if(!$providerData || !$providerData.uid){
            this.logout("Invalid");
            return this;
          }
          
          if(this.normalizer.normalize($providerData)){
            this.authenticated  = true;
            this._setupSync();
            this.save();
          }else{
            this.logout("Unknown Provider: "+$providerData.provider);
          }
        },
        "_setupSync": function(){
          var $this = this;
          if(this.$sync){
            this.$sync.$destroy();
            this.$sync = null;
          }
          if(this.uid){
            this.$sync  = $firebase(new Firebase(UsersURL+this.uid)).$asObject();
            this.$sync.$watch(function(){
              if($this.$sync){
                ng.extend($this,$this.normalizer.clense($this.$sync));
                if(!$this.authenticated){
                  $this.logout();
                }
              }
            });
          }
        },
        "getToken": function(){
          if($auth.user){
            return $auth.user.firebaseAuthToken;
          }
        }
      });
      
      return D6User;
    }
  ]);
})(angular);