angular.module('myApp', ['ui.router', 'myAppControllers', 'ngSanitize', 'ui.select', 'myAppDirectives'])


    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('users', {
                name: 'Users',
                url: '/users',
                templateUrl: 'templates/users.html',
                controller: 'MyController'
            })

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

        ;

        $urlRouterProvider.otherwise('/home');


    })

    .run(function ($rootScope, $state, loginService) {
        $rootScope.$on("$stateChangeStart", function (event, toState) {
            if (toState.authenticate) {
                loginService.loggedIn()
                    .then(function (msg) {
                        if (!msg.data) {
                            $state.transitionTo('login');
                        }
                    });

            }
        })
    })


;