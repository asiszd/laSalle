package principal

//import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*
import lasalle.Principal
//import grails.plugin.springsecurity.annotation.Secured

class PrincipalController extends RestfulController {
    static responseFormats = ['json', 'xml']
    PrincipalController() {
        super(lasalle.Principal)
    }

    def pending(){
        respond Principal.findAllByMatricula(11230004)
    }

    def login () {
        if (params.usuario == null || params.pass == null || params.usuario == '' || params.pass == ''){
            respond false;
        } else {
            def query = Principal.where {
                (matricula == params.usuario && contra == params.pass)
            }
            Principal b = query.find()
            if (b != null) {
                //respond b, view: 'index'
                println(b)
                println("EL USUARIO "+ params.usuario + " HA INGRESADO AL SISTEMA")
                respond true;
            } else {
                respond false;
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
            'y tu contraseña es: '+params.pass.toString()
        }
    }


}