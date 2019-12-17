describe("lasalle module", function() {
    var $httpBackend;

    beforeEach(angular.mock.module("lasalle", function() {
    }));

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("Principal domain", function() {

        var Principal;

        beforeEach(angular.mock.inject(function(_Principal_) {
            Principal = _Principal_;
        }));

        it("should be tested", function() {
            expect(true).toEqual(false);
        });

    });

});
