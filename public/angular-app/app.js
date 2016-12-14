var app = angular.module('zapp', ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/partials/main.html',
    })
    .otherwise({
      redirectTo:'/'
    });
});

app.directive("w3TestDirective", function() {
    return {
        restrict : "A",
        template : "<h1>Made by a directive!</h1>"
    };
});

app.directive('header', function header() {
      return {
        restrict : "A",
        templateUrl : 'angular-app/partials/header.html'
    };
});

app.directive('footer', function footer() {
      return {
        restrict : "A",
        templateUrl : 'angular-app/partials/footer.html'
    };
});
