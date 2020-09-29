class SectionEasyServices extends Element {

    constructor(element) {
        super(element);
        this.init();
    }

    get controls() {
        return this.element.querySelector('[role="tablist"]');
    }

    get contents() {
        return this.element.querySelector('[role="tabpanel"]');
    }

    create_input_element(name, type) {
        let element = document.createElement('INPUT');
        if ( type === 'labo86\\hapi\\InputFile' ) {
            element.classList.add('form-control-file');
            element.setAttribute('type', 'file');
        } else if ( type === 'labo86\\hapi\\InputFileList' ) {
            element.classList.add('form-control-file');
            element.setAttribute('type', 'file');
            element.setAttribute('multiple', '');
        } else if ( type === 'string') {
            element.classList.add('form-control');
            element.setAttribute('type', 'string');
        } else if ( type === 'int') {
            element.classList.add('form-control');
            element.setAttribute('type', 'int');
        }
        element.setAttribute('name', name);
        return element;
    }

    create_input_group(name, type) {
        let container = document.createElement('DIV');
        container.classList.add('form-group');

        let label = document.createElement('LABEL');
        label.innerHTML = name;

        container.appendChild(label);
        container.appendChild(this.create_input_element(name, type));

        return container;
    }

    create_form(data, on_success) {
        let form = new Form(document.createElement('FORM'));

        for ( let parameter of data.parameter_list ) {
            form.element.appendChild(this.create_input_group(parameter.name, parameter.type));
        }

        let button = document.createElement('BUTTON');
        button.classList.add('btn', 'btn-primary', 'mb-5');
        button.setAttribute('type', 'submit');
        button.setAttribute('data-waiting-text', 'Enviando...');
        button.setAttribute('data-ready-text', 'Enviar');
        button.innerHTML = 'Enviar';

        form.element.appendChild(button);

        let method = data.method;
        let endpoint = data.endpoint;
        form.submit_button.add_click_listener(function() {

            let form_data = form.form_data;
            form_data.set('method', method);

            form.set_disabled(true);
            form.submit_button.set_status_waiting();
            fetch(endpoint, {
                method: 'POST',
                body: form_data
            }).then(function(response) {
                if (response.ok) {
                    response.blob().then(on_success);
                    form.set_disabled(false);
                    form.submit_button.set_status_ready();
                } else {
                    response.json()
                        .then(function(data) {
                            page.handle_error(data);
                            form.set_disabled(false);
                            form.submit_button.set_status_ready();
                        });
                }
            });

        });
        return form;
    }

    set_data(data) {
        let id = this.element.id;
        for ( let automatic_method of data ) {
            let button = document.createElement('A');
            button.classList.add('nav-link');
            button.setAttribute('role', 'tab');
            button.href = '#';
            button.setAttribute('aria-controls', id + '_' + automatic_method.method);
            button.innerHTML = automatic_method.method;

            let container = document.createElement('li');
            container.classList.add('nav-link');
            container.appendChild(button);

            this.controls.appendChild(container);
        }

        for ( let automatic_method of data ) {
            let container = document.createElement('DIV');
            container.id = id + '_' + automatic_method.method;
            container.classList.add('tab-pane')
            container.setAttribute('role', 'tabpanel');

            let title = document.createElement('H3');
            title.classList.add('mb-3');
            title.innerHTML = automatic_method.method;
            container.appendChild(title);

            let frame = document.createElement('IFRAME');
            frame.classList.add('w-100', 'vh-100');
            frame.setAttribute('frameborder', 0);

            let form = this.create_form(automatic_method, function(blob) {
                frame.src = window.URL.createObjectURL(blob);
                page.snack_bar.show_success('Solicitud exitosa');
            });
            container.appendChild(form.element);
            container.appendChild(frame);

            this.contents.appendChild(container);
        }

        let tab_controls = new TabControls(this.controls);
        let tab_contents = new TabContents(this.contents);
        tab_controls.add_select_listener(function(page_name) {
            tab_contents.change_page(page_name);
        });
    }

    init() {
        let controls = document.createElement('ul');
        controls.classList.add('nav', 'flex-row', 'nav-pills', 'mb-5');
        controls.setAttribute('role', 'tablist');
        this.element.appendChild(controls);


        let contents = document.createElement('div');
        contents.classList.add('tab-content');
        contents.setAttribute('role', 'tabpanel');
        this.element.appendChild(contents);

    }

    add_services(endpoint) {
        let section = this;

        fetch(endpoint)
        .then(page.handle(
            function(data) {
                section.set_data(data);
            },
            function(json) {
                page.handle_error(json);
            }));

    }


}