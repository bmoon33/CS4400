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

        $scope.getPins = function () {
            var token = "AcTlQ_kuGf_7qnoPAS-lcpXq9YGAFIBo9Hyf81NDeN3TJQBFsgAAAAA";
            var baseURL = "https://api.pinterest.com/v1/";
            var me = "me/";
            var boards = "boards/";
            $http.get(baseURL + me + boards +
                "?access_token=" + token)
                .then(function (response) {
                    console.log(response.data);
                })

        };
    })

    .controller('LoginController', function ($scope, $http) {
        $scope.login = function () {
            /*
            Login existing user
             */
            swal({
                title: "Login Call",
                text: "Check if user credentials exist",
                type: "info"
            });
        };

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
    })


;