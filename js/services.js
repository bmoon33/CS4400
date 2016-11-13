/**
 * Created by nishantroy on 10/26/16.
 */
angular.module('myAppServices', [])

    .factory("loginService", function ($http, sessionService, $state) {
        return {
            login: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/login.php',
                    data: data
                })
                    .then(function (res) {
                        var uid = res.data;
                        if (uid) {
                            // sessionService.set('user', uid);
                            $state.transitionTo('home');
                        } else {
                            swal({
                                title: "Access Denied",
                                text: "Please try again",
                                type: "error"
                            })
                        }
                    });
            },
            logout: function () {
                sessionService.destroy();
                $state.transitionTo('login');
            },
            loggedIn: function () {
                return $http.post('DBFiles/auth.php');
            }
        }
    })

    .factory("sessionService", function ($http) {
        return {
            set: function (key, value) {
                return sessionStorage.setItem(key, value);
            },
            get: function (key) {
                return sessionStorage.getItem(key);
            },
            destroy: function () {
                $http.post('DBFiles/destroySession.php');
            }
        }
    })
;