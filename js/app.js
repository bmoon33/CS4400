angular.module('myApp', ['ui.router', 'ui.bootstrap', 'myAppControllers', 'ngSanitize', 'ui.select', 'myAppDirectives'])


    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('login', {
                name: 'Login',
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
                authenticate: false
            })

            .state('register', {
                name: 'Register',
                url: '/register',
                templateUrl: 'templates/student/register.html',
                controller: 'RegistrationController',
                authenticate: false
            })

            .state('mainPage', {
                name: 'Main Page',
                url: '/main',
                templateUrl: 'templates/student/main.html',
                controller: 'MainPageController',
                authenticate: true
            })

            .state('home', {
                name: 'Home Page',
                url: '/home',
                templateUrl: 'templates/student/home.html',
                controller: 'HomeController',
                authenticate: true
            })

            .state('editProfile', {
                name: 'Edit Profile',
                url: '/editProfile',
                templateUrl: 'templates/student/editProfile.html',
                controller: 'ProfileController',
                authenticate: true
            })

            .state('me', {
                name: 'Me',
                url: '/me',
                templateUrl: 'templates/student/me.html',
                controller: 'MeController',
                authenticate: true
            })

            .state('myApplication', {
                name: 'My Application',
                url: '/myApplication',
                templateUrl: 'templates/student/myApplication.html',
                controller: 'MyApplicationController',
                authenticate: true
            })

            .state('project', {
                name: 'Project',
                url: '/project',
                templateUrl: 'templates/student/project.html',
                controller: 'ProjectController',
                params: {data: null},
                authenticate: true
            })

            .state('homeAdmin', {
                name: 'Admin Home',
                url: '/homeAdmin',
                templateUrl: 'templates/admin/home.html',
                controller: 'AdminHomeController',
                adminAuth: true
            })

            .state('viewAppsAdmin', {
                name: 'View Applications',
                url: '/viewAppsAdmin',
                templateUrl: 'templates/admin/viewApplications.html',
                controller: 'AdminViewAppsController',
                adminAuth: true
            })

            .state('appAdmin', {
                name: 'Application',
                url: '/appAdmin',
                templateUrl: 'templates/admin/app.html',
                controller: 'AdminAppController',
                params: {data: null},
                adminAuth: true
            })

            .state('popProjectAdmin', {
                name: 'Popular Project Report',
                url: '/popProjectAdmin',
                templateUrl: 'templates/admin/popProject.html',
                controller: 'AdminPopProjectController',
                adminAuth: true
            })

            .state('appReportAdmin', {
                name: 'Application Report',
                url: '/appReportAdmin',
                templateUrl: 'templates/admin/appReport.html',
                controller: 'AdminAppReportController',
                adminAuth: true
            })

            .state('addProjectAdmin', {
                name: 'Add Project',
                url: '/addProjectAdmin',
                templateUrl: 'templates/admin/addProject.html',
                controller: 'AdminAddProjectController',
                adminAuth: true
            })

            .state('addCourseAdmin', {
                name: 'Add Course',
                url: '/addCourseAdmin',
                templateUrl: 'templates/admin/addCourse.html',
                controller: 'AdminAddCourseController',
                adminAuth: true
            })

        ;

        $urlRouterProvider.otherwise('/home');


    })

    .run(function ($rootScope, $state, loginService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
            if (toState.authenticate) {
                loginService.admin()
                    .then(function (msg) {
                        if (msg.data) {
                            $state.transitionTo(fromState.name);
                        } else {
                            loginService.loggedIn()
                                .then(function (msg) {
                                    if (!msg.data) {
                                        $state.transitionTo('login');
                                    } else if (toState.name == 'project' && fromState.name != ''
                                        && fromState.name != 'mainPage') {
                                        $state.transitionTo('mainPage');
                                    }
                                });
                        }
                    });

            }

            if (toState.adminAuth) {
                loginService.admin()
                    .then(function (msg) {
                        if (!msg.data) {
                            $state.transitionTo(fromState.name);
                        }
                    });
            }
        })
    })

    .run(['$window', '$rootScope',
        function ($window, $rootScope) {
            $rootScope.goBack = function () {
                $window.history.back();
            }
        }])

    .filter('capitalize', function () {
        return function (input) {
            return (input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })


;