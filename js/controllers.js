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
        $scope.passwordFormat = /[a-z]/;
        // $scope.passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        $scope.createUser = function () {
            //Create new user
            loginService.register($scope.object);
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

    .controller('ProfileController', function ($scope, $http) {
        $scope.object = {};

        $scope.getValues = function () {
            $http.get('DBFiles/getProfile.php')
                .then(function (res) {
                    console.log(res);
                    if (res) {
                        $scope.object.major = res.data[0].MajorName;
                        $scope.object.year = res.data[0].year;
                    }
                    console.log($scope.object);
                })
        };

        $scope.majors = [
            'CS',
            'IE',
            'Math',
            'EE',
            'Business (lol)'
        ];

        $scope.years = [
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior',
            'Never gonna leave'
        ];

        $scope.submit = function () {
            var object = {major: $scope.object.major, year: $scope.object.year};
            console.log(object);
            $http({
                method: 'POST',
                url: 'DBFiles/editProfile.php',
                data: object
            })
                .then(function (res) {
                    console.log(res);
                    if (res.data) {
                        swal({
                            title: "Error",
                            text: "Please try again",
                            type: "error"
                        })
                    } else {
                        swal({
                            title: "Success!",
                            text: "Profile updated",
                            type: "success"
                        })
                    }
                });
        }


    })

;