package lasalle


import grails.rest.*



@Resource(uri = '/principales', readOnly = false, formats = ['json', 'xml'])
class Principal {
    String nombreC, correo, nivelAca, especialidad, contra
    Integer matricula, semestre

    static constraints = {
        matricula unique: true
        correo unique: true
        especialidad nullable: true
    }
}