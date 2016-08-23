(function () {
    'use strict';

    angular.module('fs-angular-calendar',[])
    .directive('fsCalendar', function($location) {
        return {
            templateUrl: 'views/directives/calendar.html',
            restrict: 'E',
            transclude: true,
            scope: {
                options: "=fsOptions",
                instance: "=?fsInstance"
            },
            controller: function($scope) {
                $scope.view = {};
                $scope.calendar = function(arg1,arg2) {
                    return $scope.instance.calendar(arg1,arg2);
                }

                $scope.viewRender = function(view, element) {
                    $scope.view = view;
                }
            },
            link: function($scope, element, attrs, ctrl) {

                var options = angular.copy($scope.options);
                options.header = $scope.options.header || false;

                options.viewRender = function(view, element) {
                    if($scope.options.viewRender) {
                        $scope.options.viewRender(view, element);
                    }

                    $scope.viewRender(view, element);
                }

                $scope.element = angular.element('.fs-calendar-calendar');
                $scope.element.fullCalendar(options);

                if($scope.instance) {
                    angular.extend($scope.instance,new fsCalendar($scope.element,options));
                }
            }
        };
    });
})();