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
            },
            register: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/register.php',
                    data: data
                })
                    .then(function (res) {
                        var uid = res.data;
                        if (uid) {
                            console.log(uid);
                            if (uid == "Email exists") {
                                swal({
                                    title: "Error",
                                    text: "Email already exists",
                                    type: "warning"
                                })
                            } else if (uid == "User exists") {
                                swal({
                                    title: "Error",
                                    text: "Username already exists",
                                    type: "warning"
                                })
                            } else {
                                swal({
                                    title: "Error",
                                    text: "Please try again",
                                    type: "error"
                                })
                            }
                        } else {
                            swal({
                                title: "Registered",
                                text: "Successfully signed up!",
                                type: "success"
                            })
                        }
                    });
            }
        }
    })

    .factory("sessionService", function ($http) {
        return {
            destroy: function () {
                $http.post('DBFiles/destroySession.php');
            }
        }
    })
;