package principal


import grails.rest.*
import grails.converters.*
import lasalle.Principal

class PrincipalController extends RestfulController {
    static responseFormats = ['json', 'xml']
    PrincipalController() {
        super(lasalle.Principal)
    }

    def pending(){
        respond Principal.findAllByMatricula(params.matri), view: 'index'
    }

    def login () {
        if (params.usuario == null || params.pass == null || params.usuario == '' || params.pass == ''){
            println("NO HAY VARIABLES")
        } else {
            def query = Principal.where {
                (matricula == params.usuario && contra == params.pass)
            }
            Principal b = query.find()
            if (b != null) {
                //respond b, view: 'index'
                println(b)
                println("EL USUARIO "+ params.usuario + " HA INGRESADO AL SISTEMA")
                def a = b.matricula
                redirect (controller: 'Principal', action:'pending', params: [matri: b.matricula])
            } else {
                respond b, view: 'index'
                print("NO EXISTE EL USUARIO")
            }
        }

    }


}