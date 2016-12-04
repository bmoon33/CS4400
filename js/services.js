/**
 * Created by nishantroy on 10/26/16.
 */
angular.module('myAppServices', [])

    .factory("loginService", function ($http, $state) {
        return {
            login: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/authentication/login.php',
                    data: data
                })
                    .then(function (res) {
                        var uid = res.data;
                        if (uid) {
                            if (uid == 'Admin') {
                                $state.transitionTo('homeAdmin');
                            } else {
                                $state.transitionTo('home');
                            }
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
                $http.post('DBFiles/authentication/destroySession.php')
                    .then(function () {
                        localStorage.clear();
                        $state.transitionTo('login');
                    });
            },
            loggedIn: function () {
                return $http.post('DBFiles/authentication/auth.php');
            },
            admin: function () {
                return $http.post('DBFiles/authentication/admin.php');
            },
            register: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/authentication/register.php',
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
                return $http.get('DBFiles/user/getProfile.php');
            },
            update: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/user/editProfile.php',
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
                return $http.get('DBFiles/user/getMajors.php');
            }
        }
    })


    .factory("projectService", function ($http) {
        return {
            apply: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/project/apply.php',
                    data: data
                })
                    .then(function (res) {
                        if (res.data) {
                            if (res.data == 'Requirements error') {
                                swal({
                                    title: "Error",
                                    text: "You do not meet the project requirements!",
                                    type: "error"
                                })
                            } else {
                                swal({
                                    title: "Error",
                                    text: "Please try again",
                                    type: "error"
                                })
                            }
                            return false;
                        } else {
                            swal({
                                title: "Successfully Applied!",
                                text: "An admin will review your application and make a decision.",
                                type: "success"
                            });
                            return true;
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
                return $http.get("DBFiles/project/getProjects.php");
            },
            getCategories: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/project/getCategories.php',
                    data: data
                })
            },
            getRequirements: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/project/getRequirements.php',
                    data: data
                })
            },
            getInfo: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/project/getProjDetails.php',
                    data: data
                })
            },
            checkStatus: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/project/getProjectAppDetails.php',
                    data: data
                })
            }
        }
    })

    .factory("mainPageService", function ($http) {
        return {
            getFilters: function () {
                return $http.get("DBFiles/project/getFilters.php");
            },
            applyFilters: function (data) {
                return $http({
                    method: 'POST',
                    url: 'DBFiles/project/applyFilters.php',
                    data: data
                })
            }
        }
    })

    .factory("myApplicationService", function ($http) {
        return {
            getApps: function () {
                return $http.get("DBFiles/user/getMyApps.php");
            }
        }
    })

    .factory("adminService", function ($http) {
        return {
            viewApps: function () {
                return $http.get("DBFiles/admin/viewApplication.php");
            },
            updateLastApp: function (data) {
                var username = data.Username;
                var appname = data.Name;
                localStorage.setItem("username", username);
                localStorage.setItem("appname", appname);
            },
            getLastApp: function () {
                var object = {};
                object.username = localStorage.getItem("username");
                object.appname = localStorage.getItem("appname");
                return object;
            },
            getAppDetails: function (data) {

                return $http({
                    method: 'POST',
                    url: 'DBFiles/admin/getAppDetails.php',
                    data: data
                })
            },
            accept: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/admin/acceptApp.php',
                    data: data
                })
                    .then(function (res) {
                        if (res.data) {
                            swal({
                                title: "Error",
                                text: "Please try again",
                                type: "error"
                            })
                        }
                    })
            },
            reject: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/admin/rejectApp.php',
                    data: data
                })
                    .then(function (res) {
                        if (res.data) {
                            swal({
                                title: "Error",
                                text: "Please try again",
                                type: "error"
                            })
                        }
                    })
            },
            getPopProjects: function () {
                return $http.get('DBFiles/admin/viewPopProject.php');
            },
            getAppReport: function () {
                return $http.get('DBFiles/admin/viewApplicationReport.php');
            },
            getAppReportHeader: function () {
                return $http.get('DBFiles/admin/appReportHeader.php');
            },
            addProject: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/admin/addProject.php',
                    data: data
                })
                    .then(function (res) {
                        if (res.data) {
                            console.log(res);
                            swal({
                                title: "Error",
                                text: "Please try again",
                                type: "error"
                            })
                        }
                    })
            },
            addCourse: function (data) {
                $http({
                    method: 'POST',
                    url: 'DBFiles/admin/addCourse.php',
                    data: data
                })
                    .then(function (res) {
                        if (res.data) {
                            swal({
                                title: "Error",
                                text: "Please try again",
                                type: "error"
                            })
                        }
                    })
            },
            getProjectFilters: function () {
                return $http.get('DBFiles/admin/getProjectFilters.php');
            },
            getCourseFilters: function () {
                return $http.get('DBFiles/admin/getCourseFilters.php');
            }
        }

    })
;