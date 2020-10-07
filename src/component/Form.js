class Form extends Element {
    constructor(element) {
        super(element);
    }


    get form_data() {
        let form = this.dom;
        return new FormData(form);
    }

    set_disabled(disabled) {
        let form = this.dom;
        for ( let element of form.elements)
            element.disabled = disabled;
    }
}
