class SnackBar {
    constructor(element) {
        this.__element = Element.importNode(element);
    }

    get element() {
        return this.__element;
    }

    get message_box() {
        return this.element.querySelector('[data-role="message"]');
    }

    get close_button() {
        return new Button(this.element.querySelector('button[data-role="close"]'));
    }

    get alert() {
        return this.element.querySelector("[role=alert]");
    }

    show_error(message) {
        this.alert.classList.add('alert-danger');
        this.message_box.innerHTML = message;
        this.close_button.element.classList.remove('d-none');

        let element = this.element;
        this.close_button.click(function() {
            element.remove();
        });

        document.body.appendChild(element);
    }

    show_success(message) {
        this.alert.classList.add('alert-success');
        this.message_box.innerHTML = message;

        let element = this.element;
        setTimeout(function() {
            element.remove();
        }, 4000);

        document.body.appendChild(element);
    }
}
