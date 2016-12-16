angular.module('zapp').controller('TicketAddController', TicketAddController);

//function TicketAddController($location, ticketsFactory) {
function TicketAddController($route, $routeParams, $window, ticketsFactory, AuthFactory, jwtHelper) {

  var vm = this;
  vm.isSubmitted = false;

  vm.addTicket = function() {
    var postData = {
      title       : vm.title,
      description : vm.description,
      image       : vm.image,
      date        : new Date()
    }

    if(vm.ticketForm.$valid) {
      ticketsFactory.ticketAddOne(postData).then(function(response) {
        if(response.status === 201) {
          $location.path('/tickets'); //affiche la liste des tickets
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      vm.isSubmitted = true;
    }
  };

}
