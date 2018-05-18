// insert angular js code below

var djasaApp = angular.module('djasaApp', ['ngRoute', 'naif.base64']);
djasaApp.factory('myService', function() {
    var savedData = {};
    function set(data) {
      savedData = data;
    }
    function get() {
     return savedData;
    }
   
    return {
     set: set,
     get: get
    }
   
});

djasaApp.factory('sharedData', function() {
    var data = {};

    var addData = function(newObj) {
        data = newObj;  
    };
  
    var getData = function(){
        return data;
    };
  
    return {
      addData: addData,
      getData: getData,
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
        .when("/detail", {
            templateUrl: "/views/detail.html",
            controller: "detailController"
        })
        .when("/myservice", {
            templateUrl: "/views/listservice.html",
            controller: "listServiceController"
        })
        .otherwise({
            template : "<h1>404 Page Not Found</h1>"
        })
});

djasaApp.controller("listServiceController", function($q, $scope, $http){
    // $scope.user = {};
    var deffered = $q.defer();
    $http.get('/user/session')
        .then(function(response){
            deffered = response.data;

            console.log($scope.data);
        })
    
        $scope.data = deffered.promise;

    $http.get('/user/getmylist/' + $scope.data.id_account.promise)
        .then(function(response){
            $scope.listServices = response;
            console.log(response);
        })
    // console.log($scope.data)
    // $http.get('/user/getmylist/' + $scope.data.id_account)
    //     .then(function(response){
    //         $scope.listServices = response;
    //         console.log(response);
    //     })

    $scope.remove = function(service){
        $http.post('/delete', service)
        .then(function(data){
            var pos = $scope.listServices.indexOf('service');
            $scope.listServices.splice(pos,1);
        })
    }
})

djasaApp.controller("loginController", function($scope, $http, $location) {
    $scope.submitLogin = function() {
        $http.post('/user/login', $scope.login)
            .then(function(data){
                // sharedData.addData(data);
                // if(data.length > 0){
                    console.log("wildan");
                    $location.path("/home");
                // }
            })
    }
});



djasaApp.controller("signupController", function($scope, $http, sharedData, $location) {
    $scope.submitSignup = function() {
        console.log($scope.signup);
        $http.post('/user/signup', $scope.signup)
            .then(function(data){
                $location.path("/home");
            })
    }
});

djasaApp.controller("addServiceController", function($scope, $http, $location) {
    $http.get('/user/session')
        .then(function(response){
            $scope.data = response.data;
        })
    $scope.submitNewService = function() {
        
        $scope.addService.account_id = $scope.data.id_account;
        
        $scope.addService.base64 =  "data:image/jpeg;base64,"+$scope.addService.photo.base64;
        console.log($scope.data);
        console.log($scope.addService.base64)
        console.log($scope.addService);
        $http.post('/services/addservices', $scope.addService)
        .then(function(response){
            console.log("wildan");
            $location.path("/home");
        })        
    }
    
});

// djasaApp.controller("navbarController", function($scope, $http, sharedData) {
//     // $http.get('/user/session')
//     //     .then(function(data){
//     //         console.log(data);
//     //     })
//     $scope.logOut = function() {
//         $http.post('/user/logout', $scope.user.id)
//             .then(function(data){
//                 // $location.path('/landing');
//             })
//     }

//     $scope.searchCategory = function(category) {
//         sharedData.addData(category);
//     }

// });

djasaApp.controller("dashboardController", function($scope, $http, $location,myService) {
    $http.get('/user/session')
        .then(function(response){
            $scope.data = response.data;            
        })
    // var services = 
    
    // var category = sharedData.getData();
    
    // if(sharedData.isNull){
    //     category = null;
    // }

    $http.get('/services/getservices')
        .then(function(response){
            $scope.services = response.data;
        })
    // lanjutkan
    $scope.logOut = function() {
        $http.post('/user/logout', $scope.data)
            .then(function(response){
                console.log("masuk");
            })
    }

    $scope.searchCategory = function(category) {
        sharedData.addData(category);
    }

    $scope.openDetailService = function(service){
        //kirim data service
        // sharedData.addData(service); 
        myService.set(service);
        //ubah location
        $location.path('/detail');
    }
});

djasaApp.controller("detailController", function($scope, $http, myService){
    $http.get('/user/session')
        .then(function(response){
            $scope.data = response;
        })
    console.log(myService.get());
    // console.log(sharedData.getData());
    $scope.service = myService.get();   
    $http.get('/user/' + $scope.service.id_account)
        .then(function(response){
            $scope.vendor = response;
        })

    $http.get('/review/getreview/' + $scope.service.id_account)
        .then(function(response){
            $scope.reviews = response;
        })
    // console.log($scope.service);
    // console.log($scope.vendor);
    $scope.contract = function(){
        
    }
});




