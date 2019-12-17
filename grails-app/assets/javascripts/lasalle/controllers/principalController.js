//= wrapped

angular
    .module("lasalle")
    .controller("PrincipalController", PrincipalController);

function PrincipalController(Principal) {
    var vm = this;

    vm.principales = Principal.list();

    vm.newPrincipal = new Principal();

    vm.save = function() {
        vm.newPrincipal.$save({}, function() {
            vm.principales.push(angular.copy(vm.newPrincipal));
            vm.newPrincipal = new Principal();
        });
    };

    vm.delete = function(principal) {
        principal.$delete({}, function() {
            var idx = vm.principales.indexOf(principal);
            vm.principales.splice(idx, 1);
        });
    };

    vm.update = function(principal) {
        principal.$update();
    };
}
