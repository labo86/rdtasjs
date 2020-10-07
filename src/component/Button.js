class Button extends Element {

    set_disabled(disabled) {
        let button = this.dom;
        button.disabled = disabled
    }

    set_label(message) {
        this.dom.innerHTML = message;
    }

    set_status_waiting() {
        let text = this.dom.getAttribute('data-waiting-text');
        this.set_label(text);
        this.set_disabled(true);
    }

    set_status_ready() {
        let text = this.dom.getAttribute('data-ready-text');
        this.set_label(text);
        this.set_disabled(false);
    }
}