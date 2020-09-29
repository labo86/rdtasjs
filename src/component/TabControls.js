class TabControls extends Element {

    constructor(element) {
        super(element);
        this.init();
        this.__select_callback = function(){};

    }

    get control_list() {
        return this.element.querySelectorAll('[role="tab"]');
    }

    select_tab(target_tab) {
        let control_list = this.control_list;
        for ( let control of control_list ) {
            if ( control === target_tab ) {
                control.classList.add('active');
                let controls = control.getAttribute('aria-controls');
                this.__select_callback(controls);
            } else
                control.classList.remove('active');
        }
    }


    add_select_listener(callback) {
        this.__select_callback = callback;
    }

    init() {
        let this__ = this;
        let control_list = this.control_list;
        for ( let control of control_list ) {
            control.addEventListener('click', function() {
                this__.select_tab(control);
            });
        }
    }
}