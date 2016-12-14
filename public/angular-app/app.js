var app = angular.module('zapp', ['ngRoute', 'angular-jwt']).config(config).run(run);

// DIRECTIVES

app.directive('header',function(){
  return{
    restrict : 'A',
    templateUrl : 'angular-app/partials/header.html'
  }
});
app.directive('footer',function(){
  return{
    restrict : 'A',
    templateUrl : 'angular-app/partials/footer.html'
  }
});

// ROUTING

function config($httpProvider, $routeProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
  .when('/', {
    templateUrl  : 'angular-app/partials/main.html',
    access       : { restricted: false }
  })
  .when('/posts', {
    templateUrl  : 'angular-app/partials/post-list/posts.html',
//    controller   : PostsController,
//    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/post/:id', {
    templateUrl  : 'angular-app/partials/post-display/post.html',
//    controller   : PostController,
//    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/page/:id', {
    templateUrl  : 'angular-app/partials/page-display/page.html',
//    controller   : PageController,
//    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/hotels', {
    templateUrl  : 'angular-app/hotel-list/hotels.html',
    controller   : HotelsController,
    controllerAs : 'vm',
    access       : { restricted: false }
  })
  .when('/hotel/:id', {
    templateUrl  : 'angular-app/hotel-display/hotel.html',
    controller   : HotelController,
    controllerAs : 'vm',
    access       : { restricted: false }
  })
  .when('/register', {
    templateUrl  : 'angular-app/register/register.html',
    controller   : RegisterController,
    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/profile', {
    templateUrl  : 'angular-app/profile/profile.html',
    access       : { restricted: true }
  })
  .otherwise({ redirectTo:'/' });
}

// AUTH

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if(nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  })
}
