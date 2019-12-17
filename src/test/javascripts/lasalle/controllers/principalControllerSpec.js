describe("lasalle module", function() {
    var scope;

    beforeEach(angular.mock.module("lasalle", function() {
    }));

    beforeEach(angular.mock.inject(function($rootScope) {
        scope = $rootScope.$new();
    }));

    describe("PrincipalController", function() {

        var ctrl;

        beforeEach(angular.mock.inject(function($controller) {
            ctrl = $controller("PrincipalController", {});
        }));

        it("should be tested", function() {
            expect(true).toEqual(false);
        });

    });

});
