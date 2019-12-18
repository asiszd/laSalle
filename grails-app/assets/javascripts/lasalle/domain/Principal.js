//= wrapped

angular
    .module("lasalle")
    .factory("Principal", Principal);

function Principal($resource) {
    var Principal = $resource(
        "api/principales/:id",
        {"id": "@id"},
        {"update": {method: "PUT"}, "list": {method: "GET", isArray: true}}
    );
    return Principal;
}
