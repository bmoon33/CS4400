angular.module('myApp', [])

    .controller('MyController', function ($scope, $http) {
        $scope.getNames = function () {
            $http.get("users.php")
                .then(function (response) {
                    $scope.users = response.data.users;
                }, function errorCallback(response) {
                    console.log(response);
                })
        }
    })


;