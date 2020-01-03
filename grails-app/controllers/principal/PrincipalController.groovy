package principal

//import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*
import lasalle.Principal
import grails.converters.JSON
import org.grails.web.json.JSONObject

//import grails.plugin.springsecurity.annotation.Secured

class PrincipalController extends RestfulController {
    static responseFormats = ['json', 'xml']
    PrincipalController() {
        super(lasalle.Principal)
    }

    def pending(){
        respond Principal.findAllByMatricula(11230004)
    }

    def loginn () {
        if (params.usuario == null || params.pass == null || params.usuario == '' || params.pass == ''){
            def respuesta = [
                    estado : "falso"
            ]
            render (respuesta as JSON)
        } else {
            def query = Principal.where {
                (matricula == params.usuario && contra == params.pass)
            }
            Principal b = query.find()
            if (b != null) {
                def respuesta = [
                        estado : "true"
                ]
                render (respuesta as JSON)
            } else {
                def respuesta = [
                        estado : "false"
                ]
                render (respuesta as JSON)
            }
        }

    }

    def verUsuario () {
        if (params.usuario == null || params.correo == null || params.usuario == '' || params.correo == ''){
            def respuesta = [
                    estado : "error"
            ]
            render (respuesta as JSON)
        } else {
            def queryMatricula = Principal.where {
                (matricula == params.usuario)
            }
            def queryCorreo = Principal.where {
                (correo == params.correo)
            }
            Principal b = queryMatricula.find()
            Principal c = queryCorreo.find()
            if (b != null) {
                def respuesta = [estado : "422"]//MATRICULA REPETIDA
                render (respuesta as JSON)
            } else if (c != null) {
                def respuesta = [estado : "423"]//CORREO REPETIDO
                render (respuesta as JSON)
            } else {
                def respuesta = [estado : "true"]
                render (respuesta as JSON)
            }
        }

    }


    def mailService

    def sendEmail() {

        mailService.sendMail {
            to params.correo.toString()
            subject "Bienvenido al sistema de alumnos"
            body 'Hola! \r' +
            'Bienvenido al sistema de alumnos.\r' +
            'Tu Usuario es: '+ params.matricula.toString() + '\r'+
            'y tu contraseña es: '+params.pass.toString() + '\r'+ '\r' +
                    'El enlace de la página es: http://localhost/8080 '
        }
    }


}