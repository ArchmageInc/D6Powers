/*global angular */

(function(ng){
    ng.module('FirebaseAuth',[
      'firebase'
    ]).provider('$firebaseAuth',
        function(){
            'use strict';
            
            /*
             * The URL to the root Firebase instance
             * @type String
             */
            var FirebaseURL =   "";
            
            this.setUrl = function(url){
                FirebaseURL = url;
            };
            
            this.$get = ["$firebase","$firebaseSimpleLogin",function($firebase,$firebaseSimpleLogin){
              /*
               * The instance of the returned service
               * @type Object
               */
              var authService;

              /*
               * The user object as defined by normalizer
               * @type Object
               */
              var authUser;

              /*
               * The Firebase syncronization object for the authenticated user
               * @type @call;_L2._L6.$firebase@call;$asObject
               */
              var $userSync;

              /*
               * The Firebase reference object
               * @type Firebase
               */
              var ref         =   new Firebase(FirebaseURL);

              /*
               * The FireBaseSimpleLogin angular service
               * @type @call;$firebaseSimpleLogin
               */
              var $auth       =   $firebaseSimpleLogin(ref);

              /*
               * The normalizer object contains mappings from the various social data structures to
               * a single common format. It also contains a method to clense data to ensure only the
               * defined user properties are applyed and a method to return a new default user object
               * @type Object
               */
              var normalizer  =   {
                  /**
                   * The default user object structure
                   */
                  defaultUser:    {
                      name:           {
                          first:      "",
                          last:       "",
                          middle:     ""
                      },
                      imageUrl:           "",
                      email:              "",
                      provider:           "",
                      provider_id:        "",
                      displayName:        "",
                      authenticated:      false,
                      authenticating:     false
                  },
                  /**
                   * Normalize incoming data based on Facebook output
                   * @param {Object} providerData The incoming provider data
                   * @param {Object} user The user where the data should be applied
                   * @returns {undefined}
                   */
                  facebook:   function(providerData,user){
                      ng.extend(user,{
                          name:{
                              first:  providerData.first_name,
                              last:   providerData.last_name,
                              middle: ""
                          },
                          imageUrl:   providerData.picture.data.url,
                          email:      ""
                      });

                  },
                  /**
                   * Normalize incoming data based on Google output
                   * @param {Object} providerData The incoming provider data
                   * @param {Object} user The user where the data should be applied
                   * @returns {undefined}
                   */
                  google:     function(providerData,user){
                      ng.extend(user,{
                          name:   {
                              first:  providerData.given_name,
                              last:   providerData.family_name,
                              middle: ""
                          },
                          imageUrl:   providerData.picture,
                          email:      providerData.email
                      });
                  },
                  /**
                   * Normalize incoming data based on GitHub output
                   * @param {Object} providerData The incoming provider data
                   * @param {Object} user The user where the data should be applied
                   * @returns {undefined}
                   */
                  github:     function(providerData,user){
                      ng.extend(user,{
                          name:   {
                              first:  providerData.name.split(" ")[0],
                              last:   providerData.name.split(" ")[1] || "",
                              middle: ""
                          },
                          imageUrl:   providerData.avatar_url,
                          email:      providerData.email
                      });
                  },
                  /**
                   * Normalize incoming data based on Twitter output
                   * @param {Object} providerData The incoming provider data
                   * @param {Object} user The user where the data should be applied
                   * @returns {undefined}
                   */
                  twitter:    function(providerData,user){
                      ng.extend(user,{
                          name:   {
                              first:  providerData.name.split(" ")[0],
                              last:   providerData.name.split(" ")[1] || "",
                              middle: ""
                          },
                          imageUrl:   providerData.profile_image_url,
                          email:      ""
                      });
                  },
                  /**
                   * Attempt to normalize a user based on incoming provider data. If the provider
                   * normalization method is unavailable, null will be returned
                   * @param {Object} providerUser The user object returned from the provider
                   * @param {Object} user The user where the incoming data should be applied
                   * @returns {Object | null} Returns the normalized user or null on failure
                   */
                  normalize:  function(providerUser,user){
                      if(typeof this[providerUser.provider]!=="function"){
                          console.log("Unknown provider "+providerUser.provider+". Unable to normalize user");
                          return null;
                      }

                      ng.extend(user,{
                          provider:       providerUser.provider,
                          provider_id:    providerUser.id,
                          displayName:    providerUser.displayName,
                          uid:            providerUser.uid
                      });

                      this[providerUser.provider](providerUser.thirdPartyUserData,user);
                      return user;
                  },
                  /**
                   * Clenses incoming data based on the default user so only pre-defined properties
                   * will be applied to a user.
                   * @param {Object} data The data to be cleaned
                   * @param {Object} [obj] The reference object, if omitted, the default user structure 
                   * @returns {Object} Returns the cleansed object
                   */
                  clense: function(data,obj){
                      obj             =   obj || this.defaultUser;
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
                  /**
                   * Clears the passed user / Sets it to a copy of the default user
                   * @param {Object} [user] The user object to clear, if omitted an empty object is used.
                   * @returns {Object} Returns the cleared user object
                   */
                  clear: function(user){
                      user                =   user || {};
                      ng.extend(user,this.defaultUser);
                      /* We need to dereference the default name child obect for it's own new object */
                      user.name   =   ng.extend({},this.defaultUser.name);
                      return user;
                  }
              };

              /*
               * Saves the authenticated user to firebase
               * @returns {undefined}
               */
              var saveUser    =   function(){
                  if(authUser.uid){
                      return $firebase(ref.child('users')).$set(authUser.uid,authUser);
                  }
              };

              /**
               * 
               * Updates the authenticated user with the property values of the passed object.
               * If the passed object clears the authenticated flag, the user will be logged out.
               * @param {Object} userData
               * @returns {undefined}
               */
              var updateUser  =   function(userData){
                  if(!userData){
                      return;
                  }
                  ng.extend(authUser,normalizer.clense(userData));
                  if(!authUser.authenticated){
                      logout();
                  }
              };

              /**
               * Processes an incoming user from a provider. This passes the object through
               * the normalizer and assigns the information to the authenticated user.
               * @param {Object} providerUser
               * @returns {undefined}
               */
              var processUser =   function(providerUser){
                  if(!providerUser || !providerUser.uid){
                      authUser.authenticating =   false;
                      saveUser();
                      return;
                  }

                  if(normalizer.normalize(providerUser,authUser)){
                      authUser.authenticated  =   true;
                      authUser.authenticating =   false;
                      return saveUser().then(setupUserRef,logout);
                  }else{
                      logout("Unable to normalize: Unknown provider");
                  }
              };

              /**
               * Clears the currently authenticated user after logout.
               * @returns {undefined}
               */
              var clearUser   =   function(){
                  saveUser();
                  removeUserRef();
                  normalizer.clear(authUser);
              };

              /**
               * Attempts to log the user in with the given provider. If the provider is
               * ommitted, the system attempts to log the current user in. 
               * @param {String} provider The name of the authentication provider
               * @returns {undefined}
               */
              var login   =   function(provider){
                  authUser.authenticating =   true;
                  if(!provider){
                      $auth.$getCurrentUser().then(processUser,logout);
                  }else{
                      $auth.$login(provider).then(processUser,logout);
                  }
              };

              /**
               * Logs the current user out
               * @param {String} error The error message if any.
               * @returns {undefined}
               */
              var logout  =   function(error){
                  authUser.loginError     =   error || null;
                  authUser.authenticated  =   false;
                  clearUser();
                  $auth.$logout();
              };

              /**
               * Removes the reference to the User syncronization object
               * @returns {undefined}
               */
              var removeUserRef   =   function(){
                  if($userSync){
                      $userSync.$destroy();
                      $userSync =   null;
                  }
              };

              /**
               * Creates the reference to the user syncronization object for the currently authenticated user
               * @returns {undefined}
               */
              var setupUserRef    =   function(){
                  removeUserRef();
                  if(authUser.uid){
                      $userSync =   $firebase(new Firebase(FirebaseURL+"/users/"+authUser.uid)).$asObject();
                      $userSync.$watch(function(){
                          updateUser($userSync);
                      });
                  }
              };
              
              var getToken  = function(){
                if($auth.user){
                  return $auth.user.firebaseAuthToken;
                }
              };
              
              /*
               * Initialize the user as a default user object
               */
              authUser    =   normalizer.clear();

              /*
               * Assign the accessable methods and objects for the service
               */
              authService     =   {
                  login:      login,
                  logout:     logout,
                  user:       authUser,
                  getToken:   getToken
              };

              /*
               * Attempt to log the current user in (refreshing / revisiting the page)
               */
              login();

              /*
               * Return the service to the Angular module
               */
               return authService;
              
            }];
        }
    );
})(angular);