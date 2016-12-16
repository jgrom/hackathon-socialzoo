var app = angular.module('zapp', ['ngRoute', 'angular-jwt']).config(config).run(run);

/* DIRECTIVES
------------------------------------------------------------------------------*/

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

/* ROUTING
------------------------------------------------------------------------------*/

function config($httpProvider, $routeProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

  // INDEX
  $routeProvider
  .when('/', {
    templateUrl  : 'angular-app/partials/main.html',
    access       : { restricted: false }
  });

  // TICKETS
  $routeProvider
  .when('/tickets', {
    templateUrl  : 'angular-app/post-list/posts.html',
    //    controller   : PostsController,
    //    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/ticket/add', {
    templateUrl  : 'angular-app/tickets/ticket-add/ticket-add.html',
    controller   : TicketAddController,
    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/posts', {
    templateUrl  : 'angular-app/post-list/posts.html',
    //    controller   : PostsController,
    //    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/post/:id', {
    templateUrl  : 'angular-app/post-display/post.html',
    //    controller   : PostController,
    //    controllerAs : 'vm',
    access: { restricted: false }
  })
  .when('/postdemo', {
    templateUrl  : 'angular-app/post-display/post-demo.html',
    //    controller   : PostController,
    //    controllerAs : 'vm',
    access: { restricted: false }
  });

  // PROFILE
  $routeProvider
  .when('/profiles', {
    templateUrl  : 'angular-app/profile-list/profiles.html',
    access       : { restricted: false }
  })
  .when('/profile', {
    templateUrl  : 'angular-app/profile/profile.html',
    access       : { restricted: true }
  });

  // PAGE ###
  $routeProvider
  .when('/page', {
    templateUrl  : 'angular-app/page-display/page.html',
    //  controller   : PageController,
    //  controllerAs : 'vm',
    access       : { restricted: false }
  });

  // HOTEL ### SUPPR
  $routeProvider
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
  });

  // REGISTER
  $routeProvider
  .when('/register', {
    templateUrl  : 'angular-app/register/register.html',
    controller   : RegisterController,
    controllerAs : 'vm',
    access: { restricted: false }
  });
  // .when('/profile', {
  //   templateUrl  : 'angular-app/profile/profile.html',
  //   access       : { restricted: true }
  // });

  // OTHERS
  $routeProvider
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
