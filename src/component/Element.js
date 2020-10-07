class Element {
    constructor(element) {
        if (typeof element === 'string')
            element = document.getElementById(element);

        if (element === null)
            throw "Element is null";
        else if (element instanceof HTMLElement)
            this.__element = element;
        else
            throw "Not an HTMLElement";
    }

    get dom() {
        return this.__element;
    }

    id(name) {
        let result = this.dom.querySelector('[data-id="' + name + '"]');
        if ( result === null )
            throw "not found data-id:" + name;
        else
            return result;

    }

    elem(name) {
        return new Element(this.id(name));
    }

    form(name) {
        return new Form(this.id(name));
    }

    button(name) {
        return new Button(this.id(name));
    }

    new_tpl(name) {
        let tpl = this.id(name);
        return new Element(Element.tpl(tpl));
    }

    data(name) {
        return this.dom.getAttribute('data-' + name);
    }

    click(callback) {
        this.dom.addEventListener('click', function(event) {
            event.preventDefault();
            callback();
        });

    }

    static tpl(element) {
        let tpl_element = new Element(element);
        return tpl_element.dom.content.firstElementChild.cloneNode(true);
    }
}