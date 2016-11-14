/**
 * Created by nishantroy on 10/26/16.
 */
angular.module('myAppControllers', ['myAppServices'])

    .controller('MyController', function ($scope, $http) {
        $scope.getNames = function () {
            $http.get("DBFiles/users.php")
                .then(function (response) {
                    $scope.users = response.data.Users;
                }, function errorCallback(response) {
                    console.log(response);
                })
        };
    })

    .controller('MainPageController', function ($scope, $http) {
        $scope.designations = [
            {name: 'Sustainable Communities'},
            {name: 'Community'}

        ];

        $scope.majors = [
            {name: 'CS'},
            {name: 'IE'},
            {name: 'Math'},
            {name: 'EE'},
            {name: 'Business (lol)'}
        ];

        $scope.years = [
            {name: 'Freshman'},
            {name: 'Sophomore'},
            {name: 'Junior'},
            {name: 'Senior'},
            {name: 'Never gonna leave'}
        ];
    })

    .controller('RegistrationController', function ($scope, $http, loginService) {
        $scope.object = {};
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@gatech.edu$/;
        $scope.passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        $scope.createUser = function () {
            //Create new user
            swal({
                title: "Create new user",
                text: "add user info to DB and go back to login page",
                type: "info"
            });
        };
    })

    .controller('LoginController', function ($scope, $http, loginService) {
        $scope.object = {};

        $scope.register = function () {
            /*
             Register new user
             */
            swal({
                title: "New User Register",
                text: "Redirect to register page",
                type: "info"
            });
        };

        $scope.login = function () {
            loginService.login($scope.object);
        }
    })

    .controller('HomeController', function ($scope, loginService) {
        $scope.logout = function () {
            loginService.logout();
        };
    })

;