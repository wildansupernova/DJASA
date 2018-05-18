// insert angular js code below

var djasaApp = angular.module('djasaApp', ['ngRoute', 'naif.base64']);

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
            templateUrl : "/views/landing.html",
            // controller: "landingController"
        }).
        when("/login", {
            templateUrl : "/views/login.html",
            controller: "loginController"
        })
        .when("/signup", {
            templateUrl : "/views/signup.html",
            controller: "signupController"
        })
        .when("/home", {
            templateUrl: "/views/dashboard.html",
            controller: "dashboardController"
        })
        .when("/transaction", {
            templateUrl: "/views/transaction.html",
            controller: "transactionController"
        })
        .when("/addservice", {
            templateUrl: "/views/addPage.html",
            controller: "addServiceController"
        })
        .when("/myservice", {
            templateUrl: "/views/listservice.html", //sesuaikan namanya
            controller: "myServiceController"
        })
        .when("/detail", {
            templateUrl: "/views/detail.html",
            controller: "detailController"
        })
        .when("/listservice", {
            templateUrl: "/views/listservice.html",
            controller: "listServiceController"
        })
        .otherwise({
            template : "<h1>404 Page Not Found</h1>"
        })
});

djasaApp.controller("listServiceController", function($scope, $http){
    $http.get('/user/session')
        .success(function(data){
            $scope.user = data;
        })
    $scope.listService = []
    $http.get('/service/getservice/' + $scope.user.id)
        .success(function(data){
            $scope.listService = data;
        })

    $scope.remove = function(service){
        $http.get('/service/deleteservice/' + service.id);
    }
})

djasaApp.controller("loginController", function($scope, $http) {
    $scope.submitLogin = function() {
        $http.post('/user/login', $scope.login)
            .success(function(data){
                // sharedData.addData(data);
                if(data.length > 0){
                    $location.path("/home");
                }
            })
    }
});

djasaApp.controller("signupController", function($scope, $http, sharedData) {
    $scope.submitSignup = function() {
        $http.post('/user/signup', $scope.signup)
            .success(function(data){
                $location.path("/home");
            })
    }
});

djasaApp.controller("addServiceController", function($scope, $http) {
    // $http.get('/user/session')
    //     .success(function(data){
    //         $scope.user = data;
    //     })
    $scope.submitNewService = function() {
        // $http.post('/service/addservice', $scope.addService);
        console.log($scope.addService.description);
        console.log($scope.addService.photo);
        
    }
    
});

djasaApp.controller("navbarController", function($scope, $http, sharedData) {
    $http.get('/user/session')
        .success(function(data){
            $scope.user = data;
        })
    $scope.logOut = function() {
        $http.post('/user/logout', $scope.user.id)
            .success(function(data){
                // $location.path('/landing');
            })
    }

    $scope.searchCategory = function(category) {
        sharedData.addData(category);
    }

});

djasaApp.controller("dashboardController", function($scope, $http, sharedData) {
    $http.get('/user/session')
        .success(function(data){
            $scope.user = data;
        })
    // var services = 
    var category = sharedData.getData();
    if(sharedData.isNull){
        category = null;
    }

    $http.get('/services/getservices')
        .success(function(data){
            $scope.services = data;
        })
    // lanjutkan
    
    $scope.openDetailService = function(service){
        //kirim data service
        sharedData.addData(service); 
        //ubah location
        $location.path('/detail')
    }
});

djasaApp.controller("detailController", function($scope, $http, sharedData){
    $http.get('/user/session')
        .success(function(data){
            $scope.user = data;
        })
    var service = sharedData.getData();
    $scope.contract = function(){
        
    }
});
