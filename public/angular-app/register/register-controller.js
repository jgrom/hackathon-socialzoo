angular.module('zapp').controller('RegisterController', RegisterController);

function RegisterController($http) {
  var vm = this;

  vm.register = function() {
    var user = {
      username: vm.username,
      password: vm.password
    };

    if(!vm.username || !vm.password) {
      vm.error = 'Entrez un nom d\'utilisateur et un mot de passe.';
    } else {
      if(vm.password !== vm.passwordRepeat) {
        vm.error = 'Vérifiez que les mots de passe sont identiques.';
      } else {
        $http.post('/api/users/register', user).then(function(result) {
          console.log(result);
          vm.message = 'Inscription terminée. Vous pouvez vous connecter.';
          vm.error = '';
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  };
}
