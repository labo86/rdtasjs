class Button extends Element {

    get form() {
        return new Form(this.element.form);
    }

    set_disabled(disabled) {
        let button = this.element;
        button.disabled = disabled
    }

    set_label(message) {
        this.element.innerHTML = message;
    }

    add_click_listener(callback) {
        this.element.addEventListener('click', function(event) {
            event.preventDefault();
            callback();
        });
    }

    set_status_waiting() {
        let text = this.element.getAttribute('data-waiting-text');
        this.set_label(text);
        this.set_disabled(true);
    }

    set_status_ready() {
        let text = this.element.getAttribute('data-ready-text');
        this.set_label(text);
        this.set_disabled(false);
    }
}