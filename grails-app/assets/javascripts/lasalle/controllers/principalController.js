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
    var todosGrailsServerUri = 'http://127.0.0.1:8080/principales';

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
            "name": "Ingeniería de Software y Sistemas Computacionales"},
            {"name": "Educación"},
            {"name": "Negocios Internacionales"},
            {"name": "Arquitectura"},
            {"name": "Psicología"
        }]
    }, {
        "nivel": "Maestría",
        "especialidades": [{
            "name": "Tecnologías de la Información Empresarial"},
            {"name": "Educación y Docencia"},
            {"name": "Investigación Educativa"
        }]
    }, {
        "nivel": "Doctorado",
        "especialidades": [{
            "name": "Doctorado en Derecho"},
            {"name": "Doctorado en Educación"
        }]
    }];
    //vm.principales = Principal.list();
    var baseURL = 'http://localhost:8080/';

    vm.newPrincipal = new Principal();

    vm.login = function() {
        $http.post('/api/principales/login?usuario='+vm.user.username+'&pass='+vm.user.password).then(function(response) {
            var respuesta = response.data.estado;
            if (respuesta == 'true'){
                vm.authenticated = true;
                vm.principales = Principal.list();
                vm.usuario = vm.user.username;
            } else {
                alert('USUARIO O CONTRASENA INCORRECTA');
            }
        });
    };

    vm.save = function() {
        vm.newPrincipal.contra = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        vm.newPrincipal.semestre = 1;
        $http.post('/api/principales/verUsuario?usuario='+vm.newPrincipal.matricula+'&correo='+vm.newPrincipal.correo).then(function(response) {
            var respuesta = response.data.estado;
            if (respuesta == 'true') {
                vm.newPrincipal.$save({}, function () {
                    var backup = vm.newPrincipal;
                    vm.principales.push(angular.copy(vm.newPrincipal));
                    vm.newPrincipal = new Principal();
                    $http.post('api/mail?correo=' + backup.correo + '&matricula=' + backup.matricula + '&pass=' + backup.contra);
                    $window.location.href = baseURL;
                });
            } else if (respuesta == "422"){
                alert('La MATRICULA ya se encuentra en el sistema. Por favor ingrese una matricula diferente o inicie sesión con la matricula proporcionada');
            }else if (respuesta == "423"){
                alert('El CORREO ya se encuentra en el sistema');
            }
        });
        // VERIFICAR CON UN METODO EN PrincipalController SI EL USUARIO YA EXISTE EN LA BASE DE DATOS.
    };

    vm.delete = function(principal) {
        principal.$delete({}, function() {
            var idx = vm.principales.indexOf(principal);
            vm.principales.splice(idx, 1);
        });
    };

    vm.update = function(principal) {
        principal.$update();
        $window.location.href = baseURL;
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
    };

}
