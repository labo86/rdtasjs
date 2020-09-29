class Form extends Element {
    constructor(element) {
        super(element);
    }

    get element() {
        return this.__element;
    }

    get_button_by_role(role) {
        let button = this.element.querySelector('button[data-role="' + role + '"]');
        return new Button(button);
    }

    get submit_button() {
        let button = this.element.querySelector('button[type="submit"]');
        return new Button(button);
    }

    get insert_button() {
        return this.get_button_by_role('insert');
    }

    get update_button() {
        return this.get_button_by_role('update');
    }

    get clear_button() {
        return this.get_button_by_role('clear');
    }

    clear() {
        this.element.reset();
    }

    get form_data() {
        let form = this.element;
        return new FormData(form);
    }

    set_disabled(disabled) {
        let form = this.element;
        for ( let element of form.elements)
            element.disabled = disabled;
    }

    enable_clear_button() {
        let this__ = this;
        this.clear_button.add_click_listener(function() {
            this__.clear();
        });
    }
}
