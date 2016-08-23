function fsCalendar (element,options) {

    this.element = element;
    this.options = options;

    this.calendar = function(arg1,arg2) {
        return this.element.fullCalendar(arg1,arg2);
    };

}
