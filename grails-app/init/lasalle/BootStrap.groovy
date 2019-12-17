package lasalle

class BootStrap {

    def init = { servletContext ->
        5.times { new Principal(descripcion: "Principal ${it+1}").save()}
    }
    def destroy = {
    }
}
