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

    .controller('RegistrationController', function ($scope, $http) {
        $scope.createUser = function () {
            //Create new user
            swal({
                title: "Create new user",
                text: "add user info to DB and go back to login page",
                type: "info"
            });
        };
    })

    .controller('LoginController', function ($scope, $http) {
        $scope.login = function () {
            /*
            Login existing user
             */
            swal({
                title: "Enter Your Password",
                text: "Password is 2016",
                type: "input",
                inputType: "password",
                showCancelButton: true,
                closeOnConfirm : false
            }, function(password) {
                if (password === "") {
                    swal.showInputError("Please enter a password");
                    return false;
                } else if (password === "2016") {
                    swal("Correct!", "Please enjoy the videos", "success");
                } else {
                    swal.showInputError("Your password is incorrect!");
                }
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