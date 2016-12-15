angular.module('zapp').directive('rzNavigation', rzNavigation);

function rzNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
  };
}
