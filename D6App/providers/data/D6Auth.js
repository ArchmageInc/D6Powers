/* global angular */
(function(ng){
  ng.module('D6App').factory('D6Auth',[
    'D6User',
    function D6AuthFactory(User){
      var D6Auth  = {
        user: new User()
      };
      D6Auth.user.login();
      
      return D6Auth;
    }
  ]);
})(angular);