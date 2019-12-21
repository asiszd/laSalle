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
    var todosGrailsServerUri = 'http://localhost:8080/principales';

    vm.authenticated = false;
    vm.user = {};
    vm.valor = "";
    vm.isShow = false;

    vm.nivel = [{"text":"Bachillerato"}, {"text":"Licenciatura"}, {"text":"Maestria"}, {"text":"Doctorado"}];
    vm.filteredItems = [];
    vm.principales = [];
    vm.especialidades = {especialidad: ''};
    vm.niveles = [{
        "nivel":"Bachillerato",
        "especialidades":[{
        }]
    }, {
        "nivel":"Licenciatura",
        "especialidades":[{
            "name": "Ingeniería de Software y Sistemas Computacionales",
            "name": "Educación",
            "name": "Negocios Internacionales",
            "name": "Arquitectura",
            "name": "Psicología"
        }]
    }, {
        "nivel": "Maestría",
        "especialidades": [{
            "name": "Tecnologías de la Información Empresarial",
            "name": "Educación y Docencia",
            "name": "Investigación Educativa"
        }]
    }, {
        "nivel": "Doctorado",
        "especialidades": [{
            "name": "Doctorado en Derecho",
            "name": "Doctorado en Educación"
        }]
    }];
    //vm.principales = Principal.list();
    var baseURL = 'localhost:8080/';

    vm.newPrincipal = new Principal();

    vm.login = function() {
        $http.post('/api/principales/login', {
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
            var backup = vm.newPrincipal;
            vm.principales.push(angular.copy(vm.newPrincipal));
            vm.newPrincipal = new Principal();
            $http.post('api/mail?correo='+backup.correo+'&matricula='+backup.matricula+'&pass='+backup.contra)
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

    vm.getEspecialidades = function (selectedNivel) {
        var filtroEspe = $filter('filter')(vm.niveles, selectedNivel);
        return filtroEspe[0].especialidades;
    }

    vm.addTodo = function(principal) {
        var todo = {name: "This is a new todo.", completed: false};
        $http.post(todosGrailsServerUri,todo);
        console.log(principal);
    };

}
