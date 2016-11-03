angular.module('myApp', ['ui.router', 'myAppControllers', 'ngSanitize', 'ui.select'])


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
                controller: 'LoginController'
            })

            .state('register', {
                name: 'Register',
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegistrationController'
            })

            .state('mainPage', {
                name: 'Main Page',
                url: '/main',
                templateUrl: 'templates/main.html',
                controller: 'MainPageController'
            })

            .state('home', {
                name: 'Home Page',
                url: '/home',
                templateUrl: 'templates/home.html'
            })

        ;

        $urlRouterProvider.otherwise('/home');


    })


;