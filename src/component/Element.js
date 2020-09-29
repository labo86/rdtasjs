class Element {
    constructor(element) {
        if (typeof element === 'string')
            this.__element = document.getElementById(element);
        else if (element === null)
            throw "Element is null";
        else if (element instanceof HTMLElement)
            this.__element = element;
        else
            throw "Not an HTMLElement";
    }

    get element() {
        return this.__element;
    }

    get_element_by_role(role) {
        return this.element.querySelector('[data-role="' + role + '"]');
    }

    static importNode(element_id) {
        let element = document.getElementById(element_id);


        return element.content.firstElementChild.cloneNode(true);
    }
}