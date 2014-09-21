/*global angular */

(function(ng){
  ng.module('D6App').directive('d6Select',[
      '$filter',
      function($filter){
        'use strict';
                
        return {
          restrict:     'E',
          templateUrl:  '/views/ui/select.html',
          transclude:    true,
          scope:  {
            'enabled':  '=d6Enabled',
            'options':  '=d6Options',
            'model':    '=d6Model'
          },
          link: function($scope,$el,attr){
            $scope.$watch('enabled',function(enabled){
              if(enabled){
                $el.removeClass('disabled');
              }else{
                $el.addClass('disabled');
              }
            });
            $scope.$watch('options.length',function(){
              $scope.groups = $filter('unique')($scope.options,'type');
            });
          }
        };
      }
  ]);
})(angular);