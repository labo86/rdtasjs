class SnackBar extends Element {

    get message_box() {
        return this.dom.querySelector('[data-role="message"]');
    }

    get close_button() {
        return new Button(this.dom.querySelector('button[data-role="close"]'));
    }

    get alert() {
        return this.dom.querySelector("[role=alert]");
    }

    show_error(message) {
        this.alert.classList.add('alert-danger');
        this.message_box.innerHTML = message;
        this.close_button.dom.classList.remove('d-none');

        let element = this.dom;
        this.close_button.click(function() {
            element.remove();
        });

        document.body.appendChild(element);
    }

    show_success(message) {
        this.alert.classList.add('alert-success');
        this.message_box.innerHTML = message;

        let element = this.dom;
        setTimeout(function() {
            element.remove();
        }, 4000);

        document.body.appendChild(element);
    }
}
