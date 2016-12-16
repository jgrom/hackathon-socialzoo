angular.module('zapp').factory('ticketsFactory', ticketsFactory);

function ticketsFactory($http) {
  return {
    ticketGetAll : ticketGetAll,
    ticketGetOne : ticketGetOne,
    ticketAddOne : ticketAddOne,
    ticketUpdate : ticketUpdate,
    ticketDelete : ticketDelete
  };

  function ticketGetAll() {
    return $http.get('/api/tickets').then(complete).catch(error);
  }

  function ticketGetOne(id) {
    return $http.get('/api/ticket/'+id).then(complete).catch(error);
  }

  function ticketAddOne(postData) {
    return $http.post('/api/ticket/add', postData).then(complete).catch(error);
  }

  function ticketUpdate(id, ticket) { // ## pas besoin
    return $http.put('/api/ticket/update/'+id, ticket).then(complete).catch(error);
  }

  function ticketDelete(id) { // ## pas besoin
    return $http.delete('/api/ticket/delete/'+id).then(complete).catch(error);
  }

  function error(err) {
    console.log(err.statusText);
    return err;
  }

  function complete(response) {
      return response;
  }
}
