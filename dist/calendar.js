
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
function fsCalendar (element,options) {

    this.element = element;
    this.options = options;

    this.calendar = function(arg1,arg2) {
        return this.element.fullCalendar(arg1,arg2);
    };

}

angular.module('fs-angular-calendar').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/calendar.html',
    "<div class=\"fs-calendar-header\" layout=\"row\" layout-align=\"start center\">\r" +
    "\n" +
    "\t<div flex>\r" +
    "\n" +
    "\t\t<md-button ng-click=\"calendar('today')\" class=\"md-rasied today\">Today</md-button>\r" +
    "\n" +
    "\t\t<md-button ng-click=\"calendar('prev')\" class=\"md-rasied prev\"><md-icon>navigate_before</md-icon></md-button>\r" +
    "\n" +
    "\t\t<md-button ng-click=\"calendar('next')\" class=\"md-rasied next\"><md-icon>navigate_next</md-icon></md-button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t<span class=\"date\">{{view.title}}</span>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t<div>\r" +
    "\n" +
    "\t\t<md-button ng-click=\"calendar('changeView','month')\" class=\"md-rasied month\" ng-class=\"{ 'md-primary': view.type=='month' }\">Month</md-button>\r" +
    "\n" +
    "\t\t<md-button ng-click=\"calendar('changeView','agendaWeek')\" class=\"md-rasied week\" ng-class=\"{ 'md-primary': view.type=='agendaWeek' }\">Week</md-button>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"fs-calendar-calendar\"></div>\r" +
    "\n"
  );

}]);
