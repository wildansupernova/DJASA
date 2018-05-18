// insert angular js code below

var djasaApp = angular.module('djasaApp', ['ngRoute']);

djasaApp.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : "landing.html",
            controller: "landingController"
        })
        .when("/home", {
            templateUrl: "dashboard.html",
            controller: "dashboardController"
        })
        .when("/transaction", {
            templateUrl: "transaction.html",
            controller: "transactionController"
        })
        .when("/addservice", {
            templateUrl: "addPage.html",
            controller: "addServiceController"
        })
        .when("/myservice", {
            templateUrl: "myservice.html", //sesuaikan namanya
            controller: "myServiceController"
        })
        .otherwise({
            template : "<h1>404 Page Not Found</h1>"
        })
})

function loginController($scope, $http) {
    var submitLogin = function() {

    }
}

function signupController($scope, $http) {
    var submitSignup = function() {

    }
}

function addServiceController($scope, $http) {
    var submitNewService = function() {

    }
}

function navbarController($scope, $http) {
    var logOut = function() {

    }

    
}

