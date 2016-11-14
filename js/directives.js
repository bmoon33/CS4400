/**
 * Created by nishantroy on 11/13/16.
 */
angular.module('myAppDirectives', [])

    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {

                var me = attrs.ngModel;
                var matchTo = attrs.pwCheck;
                scope.$watchGroup([me, matchTo], function(value){
                    ctrl.$setValidity('pwmatch', value[0] === value[1] );
                });

            }
        }
    }])

;