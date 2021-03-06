<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>Welcome to Grails</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <!-- Compiled and minified CSS -->
    <asset:stylesheet href="materialize/css/materialize.min.css"/>
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
    html,

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    input[type=number] {
        -moz-appearance:textfield; /* Firefox */
    }

    body {
        height: 100%;
    }
    html {
        display: table;
        margin: auto;
    }
    body {
        display: table-cell;
        vertical-align: middle;
        background: #4ECDC4;
    }

    #login-page {
        width: 500px;
    }

    .card {
        position: absolute;
        left: 50%;
        top: 50%;
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .input-field input[type=text] {
        color: white;
    }
    .input-field input[type=text]:disabled {
        color: #969696;
    }
    .input-field input[type=text]:disabled +label{
        color: #787878;
    }
    .card-small {
        width: 400px;
    }
    </style>

</head>
<body ng-app="lasalle" ng-controller="PrincipalController as vm">
<div id="content" role="main">
    <section class="row colset-2-its">

        <!-- Our code will be here -->

        <div ng-switch="vm.authenticated">
            <div ng-switch-when="true">
                <div ng-include="'/lasalle/list.html'"></div>
            </div>
            <div ng-switch-when="false">
                <div ng-include="'/lasalle/login.html'"></div>
            </div>
            <div ng-switch-when="false">
                <div ng-include="'/lasalle/new.html'"></div>
            </div>
        </div>

    </section>
</div>
    <asset:javascript src="materialize/js/materialize.min.js"></asset:javascript>
    <asset:javascript src="/lasalle/app.js" />
</body>
</html>
