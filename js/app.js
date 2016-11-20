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
                templateUrl: 'templates/register.html',
                controller: 'RegistrationController',
                authenticate: false
            })

            .state('mainPage', {
                name: 'Main Page',
                url: '/main',
                templateUrl: 'templates/main.html',
                controller: 'MainPageController',
                authenticate: true
            })

            .state('home', {
                name: 'Home Page',
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                authenticate: true
            })

            .state('editProfile', {
                name: 'Edit Profile',
                url: '/editProfile',
                templateUrl: 'templates/editProfile.html',
                controller: 'ProfileController',
                authenticate: true
            })

            .state('me', {
                name: 'Me',
                url: '/me',
                templateUrl: 'templates/me.html',
                controller: 'MeController',
                authenticate: true
            })

            .state('myApplication', {
                name: 'My Application',
                url: '/myApplication',
                templateUrl: 'templates/myApplication.html',
                controller: 'MyApplicationController',
                authenticate: true
            })

            .state('project', {
                name: 'Project',
                url: '/project',
                templateUrl: 'templates/project.html',
                controller: 'ProjectController',
                params: {data: null},
                authenticate: true
            })

        ;

        $urlRouterProvider.otherwise('/home');


    })

    .run(function ($rootScope, $state, loginService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
            if (toState.authenticate) {
                loginService.loggedIn()
                    .then(function (msg) {
                        if (!msg.data) {
                            $state.transitionTo('login');
                        } else if (toState.name == 'project' && fromState.name != '' && fromState.name != 'mainPage') {
                            $state.transitionTo('mainPage');
                        }
                    });

            }
        })
    })


;