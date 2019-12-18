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

function PrincipalController(Principal, $http, $window) {
    var vm = this;

    vm.authenticated = false;
    vm.user = {};

    vm.principales = [];
    //vm.principales = Principal.list();

    vm.newPrincipal = new Principal();

    vm.login = function() {
        $http.post('/api/login', {
            username: vm.user.username,
            password: vm.user.password
        }).then(function(response) {
            vm.authenticated = true;
            $window.sessionStorage.token = response.data.accessToken;
            vm.principales = Principal.list();
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
        principal.$update();
    };
}
