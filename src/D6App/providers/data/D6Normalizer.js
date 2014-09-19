/* global angular */
(function(ng){
  ng.module('D6App').factory('D6Normalizer',[
    'D6Utils',
    function D6NormalizerFactory($d6){
      
      function D6Normalizer($user){
        this.$user  = $user;
        
      };
      D6Normalizer.prototype={
          facebook:   function($providerData){
            ng.extend(this.$user,{
              name:{
                first:  $providerData.first_name,
                last:   $providerData.last_name,
                middle: ""
              },
              imageUrl:   $providerData.picture.data.url,
              email:      ""
            });
          },
          google:     function($providerData){
            ng.extend(this.$user,{
              name:   {
                first:  $providerData.given_name,
                last:   $providerData.family_name,
                middle: ""
              },
              imageUrl:   $providerData.picture,
              email:      $providerData.email
            });
          },
          github:     function($providerData){
            ng.extend(this.$user,{
              name:   {
                first:  $providerData.name.split(" ")[0],
                last:   $providerData.name.split(" ")[1] || "",
                middle: ""
              },
              imageUrl:   $providerData.avatar_url,
              email:      $providerData.email
            });
          },
          twitter:    function($providerData){
            ng.extend(this.$user,{
              name:   {
                first:  $providerData.name.split(" ")[0],
                last:   $providerData.name.split(" ")[1] || "",
                middle: ""
              },
              imageUrl:   $providerData.profile_image_url,
              email:      ""
            });
          },
          clense: function(data,obj){
            obj             =   obj || $d6.clone(this._user);
            var cleanData   =   {};
            
            for(var k in obj){
              if(data[k]!==undefined && typeof obj[k]==="object" && typeof data[k]==="object"){
                cleanData[k]    =   this.clense(data[k],obj[k]);
              }else if( data[k]!==undefined && typeof data[k]!=="object" ){
                cleanData[k]    =   data[k];
              }
            }
            return cleanData;
          },
          clear: function(){
            ng.extend(this.$user,this._user);
            return this.$user;
          },
          normalize:  function($providerData){
            if(typeof this[$providerData.provider]!=="function"){
              $d6.log.warn("Unable to normalize user: Unknown provider "+$providerData.provider+".");
              return null;
            }
            
            ng.extend(this.$user,{
              provider:       $providerData.provider,
              provider_id:    $providerData.id,
              displayName:    $providerData.displayName,
              uid:            $providerData.uid
            });

            this[$providerData.provider]($providerData.thirdPartyUserData);
            return this.$user;
          },
      };
      
      $d6.addD6Properties(D6Normalizer.prototype,{
        "_user":  {
          name:{
            first:      "",
            last:       "",
            middle:     ""
          },
          uid:                "",
          imageUrl:           "",
          email:              "",
          provider:           "",
          provider_id:        "",
          displayName:        "",
          authenticated:      false,
          authenticating:     false
        }
      });
      
      return D6Normalizer;
    }
  ]);
})(angular);