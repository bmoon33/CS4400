/**
 * Created by nishantroy on 10/26/16.
 */
angular.module('myAppControllers', ['myAppServices'])

    .controller('MainPageController', function ($scope, projectService, mainPageService) {
        $scope.object = {};

        $scope.init = function () {
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
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior'
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
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior'
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

    .controller('ProjectController', function ($scope, $stateParams, projectService) {
        if ($stateParams.data != null) {
            $scope.data = $stateParams.data;
            $scope.bool = $scope.data.Type == 'Course'; //True if type is course, false if project
            projectService.updateLast($stateParams.data);
        } else {
            $scope.data = projectService.getLast();
            $scope.bool = $scope.data.Type == 'Course';
        }

        $scope.init = function () {
            $scope.project = {};
            $scope.course = {};
            var promise;
            promise = projectService.getInfo($scope.data);
            promise.then(function (res) {
                if (!$scope.bool) {
                    $scope.project = res.data[0];
                    var appStatus = projectService.checkStatus($scope.data);
                    appStatus.then(function (res) {
                        console.log(res.data);
                        $scope.status = res.data;
                    });
                } else {
                    $scope.course = res.data[0];
                }
            });

            var categories = projectService.getCategories($scope.data);
            categories.then(function (res) {
                var cat = '';
                for (var i = 0; i < res.data.length; i++) {
                    if (i == res.data.length - 1) {
                        cat += res.data[i].Category_name;
                    } else {
                        cat += res.data[i].Category_name + ', ';
                    }
                }
                if (!$scope.bool) {
                    $scope.project.categories = cat;
                } else {
                    $scope.course.categories = cat;
                }
            });

            if (!$scope.bool) {
                var restrictions = projectService.getRequirements($scope.data);
                restrictions.then(function (res) {
                    var str = '';
                    for (var i = 0; i < res.data.length; i++) {
                        if (i == res.data.length - 1) {
                            str += res.data[i].Requirement;
                        } else {
                            str += res.data[i].Requirement + ', ';
                        }
                    }
                    $scope.project.requirements = str;
                })
            }

        };

        $scope.apply = function (data) {
            console.log(data);
            if ($scope.status == 'reject') {
                swal({
                    title: "Cannot apply again!",
                    text: "You were previously rejected for this project. Sorry!",
                    type: "warning"
                })
            } else if($scope.status == 'accept') {
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
                projectService.apply(data);
                $scope.status = 'pending';
            }
        }
    })

;