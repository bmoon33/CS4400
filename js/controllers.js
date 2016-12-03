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

        $scope.getProjects = function () {
            var promise = projectService.getAll();
            promise.then(function (res) {
                console.log("projects: " + res.data);
                $scope.projects = res.data;
            })
        };

        $scope.getFilters = function () {
            var promise = mainPageService.getFilters();
            promise.then(function (res) {
                $scope.categories = res.data.Category;
                $scope.designations = res.data.Designation;
                $scope.majors = res.data.Major;
                console.log(res.data.Major);
                // $scope.majors = res.data.Major;
            })
        };

        $scope.isNavCollapsed = false;

        $scope.clicked = function () {
            console.log($scope.object);
        };

        /*
         $scope.designations = [
         'Sustainable Communities',
         'Community'

         ];

         $scope.categories = [
         'Category 1',
         'Category 2',
         'Category 3',
         'Category 4'
         ];*/

        $scope.years = [
            'Freshman',
            'Sophomore',
            'Junior',
            'Senior'
        ];

        /*$scope.projects = [
         {name: 'Project 1', type: 'Course'},
         {name: 'Project 2', type: 'Course'},
         {name: 'Project 3', type: 'Project'},
         {name: 'Project 4', type: 'Project'},
         {name: 'Project 5', type: 'Course'},
         {name: 'Project 6', type: 'Project'},
         {name: 'Project 7', type: 'Course'},
         {name: 'Project 8', type: 'Course'},
         {name: 'Project 9', type: 'Project'}
         ]*/
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

    .controller('MyApplicationController', function ($scope) {
        $scope.apps = [
            {date: '10/14/2016', name: 'Project 1', status: 'Approved'},
            {date: '11/24/2016', name: 'Project 2', status: 'Pending'},
            {date: '1/7/2015', name: 'Project 3', status: 'Approved'},
            {date: '8/3/2014', name: 'Project 4', status: 'Approved'},
            {date: '4/25/2015', name: 'Project 5', status: 'Rejected'},
            {date: '6/11/2016', name: 'Project 6', status: 'Pending'}

        ]
    })

    .controller('ProjectController', function ($scope, $stateParams, projectService) {
        if ($stateParams.data != null) {
            $scope.data = $stateParams.data;
            projectService.updateLast($stateParams.data);
        } else {
            $scope.data = projectService.getLast();
        }

        $scope.init = function () {
            var data = {name: $scope.data};
            console.log(data);
            var promise = projectService.getInfo(data);
            promise.then(function (res) {
                $scope.project = res.data[0];
                console.log($scope.project);
            })
        }
    })

;