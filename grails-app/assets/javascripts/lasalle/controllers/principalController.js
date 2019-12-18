//= wrapped

angular
    .module("lasalle")
    .factory('authInterceptor', function ($rootScope, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })
    .controller("PrincipalController", PrincipalController);

function PrincipalController(Principal, $http, $filter,$window) {
    var vm = this;

    vm.authenticated = false;
    vm.user = {};
    vm.valor = "";
    vm.isShow = false;

    vm.nivel = [{"text":"Bachillerato"}, {"text":"Licenciatura"}, {"text":"Maestria"}, {"text":"Doctorado"}];
    vm.filteredItems = [];
    vm.principales = [];
    //vm.principales = Principal.list();
    var baseURL = 'localhost:8080/';

    vm.newPrincipal = new Principal();

    vm.login = function() {
        $http.post('/api/login', {
            username: vm.user.username,
            password: vm.user.password
        }).then(function(response) {
            vm.authenticated = true;
            $window.sessionStorage.token = response.data.access_token;
            vm.principales = Principal.list();
            vm.usuario = response.data.username.toString();
            //vm.filteredItems = $filter('filter')(vm.principales, {"nombre":"asis"}, true );
            //console.log(vm.filteredItems);
            console.log("-----------------------------------------------------------");
            console.log(vm.principales);
        });
    };

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
        console.log(principal);
        principal.$update();
    };

    vm.toggleDisplay = function() {
        vm.isShow = !vm.isShow;
    }
}
