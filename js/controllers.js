/**
 * Created by nishantroy on 10/26/16.
 */
angular.module('myAppControllers', ['myAppServices'])

    .controller('MainPageController', function ($scope, projectService, mainPageService) {

        $scope.init = function () {
            $scope.object = {};
            $scope.object.filterType = 'Both';
            $scope.getProjects();
            $scope.getFilters();
        };

        $scope.applyFilters = function () {
            console.log($scope.object);
            var promise = mainPageService.applyFilters($scope.object);
            promise.then(function (res) {
                $scope.projects = res.data;
                console.log(res);
            });
        };

        $scope.getProjects = function () {
            var promise = projectService.getAll();
            promise.then(function (res) {
                $scope.projects = res.data;
            })
        };

        $scope.getFilters = function () {
            var promise = mainPageService.getFilters();
            promise.then(function (res) {
                $scope.categories = res.data.Category;
                $scope.designations = res.data.Designation;
                $scope.majors = res.data.Major;
            })
        };


        $scope.years = [
            'freshman',
            'sophomore',
            'junior',
            'senior'
        ];


    })

    .controller('RegistrationController', function ($scope, $http, loginService) {
        $scope.object = {};
        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@gatech.edu$/;
        $scope.passwordFormat = /[a-z]/;
        // $scope.passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        $scope.createUser = function () {
            loginService.register($scope.object);
        };
    })

    .controller('LoginController', function ($scope, $http, loginService) {
        $scope.object = {};

        $scope.login = function () {
            loginService.login($scope.object);
        }
    })

    .controller('HomeController', function ($scope, loginService) {
        $scope.logout = function () {
            loginService.logout();
        };
    })

    .controller('ProfileController', function ($scope, $http, profileService) {
        $scope.object = {};
        $scope.getValues = function () {
            var profile = profileService.get();
            profile.then(function (res) {
                if (res) {
                    $scope.object.major = res.data[0].Major;
                    $scope.object.year = res.data[0].Year;
                    $scope.object.dept = res.data[0].Dept_name;
                }
            });

            var majors = profileService.getMajors();
            majors.then(function (res) {
                if (res) {
                    $scope.majors = res.data;
                }
            });


        };

        //Pull from DB when data entered

        $scope.updateDept = function () {
            var object = $scope.object.major;
            $scope.object.major = object.Name;
            $scope.object.dept = object.Dept_name;
        };


        $scope.years = [
            'freshman',
            'sophomore',
            'junior',
            'senior'
        ];

        $scope.submit = function () {
            profileService.update($scope.object);
        }


    })

    .controller('MeController', function ($scope) {
        //    Functionality for "Me" page if needed
    })

    .controller('MyApplicationController', function ($scope, myApplicationService) {
        $scope.init = function () {
            var myApps = myApplicationService.getApps();
            myApps.then(function (res) {
                console.log(res);
                $scope.apps = res.data;
            })
        };
    })

    .controller('ProjectController', function ($scope, $stateParams, projectService, $q) {
        $scope.init = function () {
            $scope.project = {};
            $scope.course = {};
            var promise;
            promise = projectService.getInfo($scope.data);
            promise.then(function (res) {
                if (!$scope.bool) {
                    $scope.project = res.data[0];
                    console.log(res);
                    var appStatus = projectService.checkStatus($scope.data);
                    appStatus.then(function (res) {
                        console.log(res.data);
                        $scope.status = res.data;
                    });
                } else {
                    $scope.course = res.data[0];
                }
            });
            var categories = '';
            var catPromise = projectService.getCategories($scope.data);
            catPromise.then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    if (i == res.data.length - 1) {
                        categories += res.data[i].Category_name;
                    } else {
                        categories += res.data[i].Category_name + ', ';
                    }
                }
            });


            var reqPromise;
            var requirements = {};
            if (!$scope.bool) {
                reqPromise = projectService.getRequirements($scope.data);
                reqPromise.then(function (res) {
                    requirements.yearReq = res.data[0].Year_requirement;
                    requirements.majorReq = res.data[0].Major_requirement;
                    requirements.deptReq = res.data[0].Department_requirement;
                })
            }

            $q.all([reqPromise, catPromise, promise])
                .then(function () {
                    if (!$scope.bool) {
                        $scope.project.categories = categories;
                        $scope.project.requirements = requirements;
                    } else {
                        $scope.course.categories = categories;
                    }

                })

        };

        if ($stateParams.data != null) {
            $scope.data = $stateParams.data;
            $scope.bool = $scope.data.Type == 'Course'; //True if type is course, false if project
            projectService.updateLast($stateParams.data);
        } else {
            $scope.data = projectService.getLast();
            $scope.bool = $scope.data.Type == 'Course';
        }

        $scope.apply = function (data) {
            if ($scope.status == 'reject') {
                swal({
                    title: "Cannot apply again!",
                    text: "You were previously rejected for this project. Sorry!",
                    type: "warning"
                })
            } else if ($scope.status == 'accept') {
                swal({
                    title: "Cannot apply again!",
                    text: "You have already been accepted! Congratulations :)",
                    type: "warning"
                })
            } else if ($scope.status == 'pending') {
                swal({
                    title: "Cannot apply again!",
                    text: "Your application is pending. We will get back to you as soon as possible!",
                    type: "warning"
                })
            } else {
                var val = projectService.apply(data);
                val.then(function (res) {
                    if (res) {
                        $scope.status = 'pending';
                    }
                })
            }
        }
    })

    .controller('AdminHomeController', function ($scope, loginService) {
        $scope.logout = function () {
            loginService.logout();
        };
    })

    .controller('AdminViewAppsController', function ($scope, adminService) {
        $scope.init = function () {
            var promise = adminService.viewApps();
            promise.then(function (res) {
                console.log(res);
                $scope.apps = res.data;
            })
        };


    })

    .controller('AdminAppController', function ($scope, adminService, $stateParams) {
        if ($stateParams.data != null) {
            $scope.app = $stateParams.data;
            $scope.bool = $scope.app.Status == 'Pending';
            adminService.updateLastApp($stateParams.data);
        } else {
            var object = adminService.getLastApp();
            adminService.getAppDetails(object)
                .then(function (res) {
                    console.log(res);
                    $scope.app = res.data[0];
                    $scope.bool = $scope.app.Status == 'Pending';
                });
        }

        $scope.accept = function (app) {
            if ($scope.bool) {
                adminService.accept(app);
            } else {
                swal({
                    title: "Error",
                    text: "Decision has already been made",
                    type: "error"
                })
            }
        };

        $scope.reject = function (app) {
            if ($scope.bool) {
                adminService.reject(app);
            } else {
                swal({
                    title: "Error",
                    text: "Decision has already been made",
                    type: "error"
                })
            }
        }

    })

    .controller('AdminPopProjectController', function ($scope, adminService) {
        $scope.init = function () {
            var promise = adminService.getPopProjects();
            promise.then(function (res) {
                $scope.reports = res.data;
            })
        }
    })

    .controller('AdminAppReportController', function ($scope, adminService) {
        $scope.init = function () {
            var promise = adminService.getAppReport();
            promise.then(function (res) {
                $scope.reports = res.data;
            });

            var headerPromise = adminService.getAppReportHeader();
            headerPromise.then(function (res) {
                console.log(res);
                $scope.header = res.data;
            });
        }
    })

;