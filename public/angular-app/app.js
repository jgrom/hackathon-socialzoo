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
