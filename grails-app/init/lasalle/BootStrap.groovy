package lasalle

class BootStrap {


    def init = { servletContext ->
        //Spring security
        Role admin = new Role("ROLE_ADMIN").save()
        User user = new User("user", "pass").save()
        UserRole.create(user, admin, true)

        5.times { new Principal(descripcion: "Principal ${it+1}").save()}
    }
    def destroy = {
    }
}
