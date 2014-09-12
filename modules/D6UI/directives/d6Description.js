/*global angular */

(function(ng){
  ng.module('D6UI').directive('d6Description',[
      '$window',
      function($window){
        'use strict';
        
        var watchDescription  = function($scope,$el){
          return function(){
            if(!$scope.description || !$scope.description.length){
              $el.removeAttr('data-description');
            }else{
              var rightSpace  = $window.innerWidth-$el[0].offsetLeft;
              var removeClass = "d6-description-"+(rightSpace<400 ? 'right' : 'left');
              var addClass    = "d6-description-"+(rightSpace<400 ? 'left' : 'right');
              
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
            $el.on('mouseover',watchDescription($scope,$el));
          }   
        };
      }
  ]);
})(angular);