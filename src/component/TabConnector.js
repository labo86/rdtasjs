class TabConnector {

    constructor() {
        this.control_list = [];
        this.select_callback_list = {};

    }

    add_contents(element) {
        let control = new class extends Element {

            get element_list() {
                let list = [];
                for (let child of this.dom.childNodes) {
                    if (child.tagName === 'DIV')
                        list.push(child);
                }
                return list;
            }

            select(page_name) {
                let pane_list = this.element_list;
                for ( let pane of pane_list ) {
                    let id = pane.getAttribute('data-id');
                    if ( id === page_name )
                        pane.classList.add('active');
                    else
                        pane.classList.remove('active');
                }
            }
        }(element);

        this.control_list.push(control);
    }

    add_buttons(element) {
        let control = new class extends Element {

            get element_list() {
                return this.element.querySelectorAll('[role="tab"]');
            }

            select(target_name) {
                let control_list = this.element_list;
                for ( let control of control_list ) {
                    let name = control.getAttribute('aria-controls');
                    if ( name === target_name ) {
                        control.classList.add('active');
                    } else
                        control.classList.remove('active');
                }
            }


            click(callback) {

                let control_list = this.element_list;
                for ( let control of control_list ) {
                    let name = control.getAttribute('aria-controls');
                    control.addEventListener('click', function() {
                        callback(name);
                    });
                }
            }
        }(element);

        this.control_list.push(control);

        let self = this;
        control.click(function(name) {
            self.update(name);
        });
    }

    selected(target, callback) {
        this.select_callback_list[target] = callback;
    }

    async update(target) {
        let control_list = this.control_list;
        if ( this.select_callback_list.hasOwnProperty(target) ) {
            let callback = this.select_callback_list[target];
            callback();
        }

        for ( let control of control_list ) {
            control.select(target);
        }
    }

}