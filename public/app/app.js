// insert angular js code below

var djasaApp = angular.module('djasaApp', ['ngRoute']);

djasaApp.service('sharedData', function() {
    var data;
    var isNull = true;
  
    var addData = function(newObj) {
        data = newObj;
        isNull = false;
    };
  
    var getData = function(){
        isNull = true;
        return data;
    };
  
    return {
      addData: addData,
      getData: getData,
      isNull: isNull
    };
  
  });

djasaApp.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : "landing.html",
            controller: "landingController"
        }).
        when("/login", {
            templateUrl : "login.html",
            controller: "loginController"
        })
        .when("/signup", {
            templateUrl : "signup.html",
            controller: "signupController"
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
            templateUrl: "listservice.html", //sesuaikan namanya
            controller: "myServiceController"
        })
        .when("/detail", {
            templateUrl: "detail.html",
            controller: "detailController"
        })
        .when("/listservice", {
            templateUrl: "listservice.html",
            controller: "listServiceController"
        })
        .otherwise({
            template : "<h1>404 Page Not Found</h1>"
        })
});

djasaApp.controller("listServiceController", function($scope, $http){
    $scope.remove = function(service){

    }
})

djasaApp.controller("loginController", function($scope, $http) {
    $scope.submitLogin = function() {

    }
});

djasaApp.controller("signupController", function($scope, $http) {
    $scope.submitSignup = function() {

    }
});

djasaApp.controller("addServiceController", function($scope, $http) {
    $scope.submitNewService = function() {

    }
});

djasaApp.controller("navbarController", function($scope, $http, sharedData) {
    $scope.logOut = function() {

    }

    $scope.searchCategory = function(category) {
        sharedData.addData(category);
    }

});

djasaApp.controller("dashboardController", function($scope, $http, sharedData) {
    // var services = 
    var category = sharedData.getData();
    if(sharedData.isNull){
        category = null;
    }

    // lanjutkan
    
    $scope.openDetailService = function(service){
        //kirim data service
        sharedData.addData(service); 
        //ubah location
        $location.path('/detail')
    }
});

djasaApp.controller("detailController", function($scope, $http, sharedData){
    var service = sharedData.getData();
    $scope.contract = function(){
        
    }
});



