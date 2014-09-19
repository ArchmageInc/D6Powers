/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Description',[
      '$window',
      function($window){
        'use strict';
        
        function watchDescription($scope,$el){
          return function(){
            if(!$scope.description || !$scope.description.length){
              $el.removeAttr('data-description');
            }else{
              var left   =  $el[0].offsetLeft;
              var right  =  $window.innerWidth-$el[0].offsetLeft;
              var removeClass = "d6-description-"+(right<400 ? 'right' : 'left');
              var addClass    = "d6-description-"+(right<400 ? 'left' : 'right');
              
              $el.removeClass(removeClass);
              $el.addClass(addClass);
              $el.attr('data-description',$scope.description);
            }
          };
        };
        
        return {
          restrict: 'A',
          scope:{
            'description':  '=d6Description'
          },
          link:     function($scope,$el,attrs){
            watchDescription($scope,$el)();
            $el.on('mouseover',watchDescription($scope,$el));
          }   
        };
      }
  ]);
})(angular);