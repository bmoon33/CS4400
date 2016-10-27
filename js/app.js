angular.module('myApp', ['ui.router', 'myAppControllers'])


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

        ;

        $urlRouterProvider.otherwise('/users');


    })


;