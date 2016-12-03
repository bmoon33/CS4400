/**
 * Created by nishantroy on 10/26/16.
 */
angular.module('myAppServices', [])

    .factory("loginService", function ($http, $state) {
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
                $http.post('DBFiles/destroySession.php')
                    .then(function () {
                        $state.transitionTo('login');
                    });
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


    .factory("profileService", function ($http) {
        return {
            get: function () {
                return $http.get('DBFiles/getProfile.php');
            },
            update: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/editProfile.php',
                    data: data
                })
                    .then(function (res) {
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
            },
            getMajors: function () {
                return $http.get('DBFiles/getMajors.php');
            }
        }
    })


    .factory("projectService", function ($http) {
        return {
            apply: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/apply.php',
                    data: data
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
                                title: "Successfully Applied!",
                                text: "An admin will review your application and make a decision.",
                                type: "success"
                            })
                        }
                    });

            },
            getLast: function () {
                var out = {};
                out.Name = localStorage.getItem("name");
                out.Type = localStorage.getItem("type");
                return out;
            },
            updateLast: function (project) {
                console.log(project);
                var type = project.Type;
                var name = project.Name;
                localStorage.setItem("name", name);
                localStorage.setItem("type", type);
            },
            getAll: function () {
                return $http.get("DBFiles/getProjects.php");
            },
            getCategories: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/getCategories.php',
                    data: data
                })
            },
            getRequirements: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/getRequirements.php',
                    data: data
                })
            },
            getInfo: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/getProjDetails.php',
                    data: data
                })
            },
            checkStatus: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/getProjectAppDetails.php',
                    data: data
                })
            }
        }
    })

    .factory("mainPageService", function ($http) {
        return {
            getFilters: function () {
                return $http.get("DBFiles/getFilters.php");
            }
        }
    })

    .factory("myApplicationService", function ($http) {
        return {
            getApps: function () {
                return $http.get("DBFiles/getMyApps.php");
            }
        }
    })
;