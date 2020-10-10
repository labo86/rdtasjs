class SectionEasyServices extends Element {

    constructor(element) {
        super(element);
        this.controls = this.id('nav');
        this.contents = this.id('contents');

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
            form.dom.appendChild(this.create_input_group(parameter.name, parameter.type));
        }

        let button = document.createElement('BUTTON');
        button.classList.add('btn', 'btn-primary', 'mb-5');
        button.setAttribute('data-id', 'submit');
        button.setAttribute('data-waiting-text', 'Enviando...');
        button.setAttribute('data-ready-text', 'Enviar');
        button.innerHTML = 'Enviar';

        form.dom.appendChild(button);

        let method = data.method;
        let endpoint = data.endpoint;
        form.button('submit').click(async function() {

            let button = form.button('submit');
            let form_data = form.form_data;
            form_data.set('method', method);

            form.set_disabled(true);
            button.set_status_waiting();
            try {
                const response = await page.fetch(endpoint, form_data);
                const success = await response.blob();
                on_success(success);
            } catch ( exception ) {
                await page.handle_exception(exception);
            } finally {
                form.set_disabled(false);
                button.set_status_ready();
            }

        });
        return form;
    }

    set_data(data) {
        this.controls.innerHTML = "";
        for ( let automatic_method of data ) {
            let button = document.createElement('A');
            button.classList.add('nav-link');
            button.setAttribute('role', 'tab');
            button.href = '#';
            button.setAttribute('aria-controls', 'method_' + automatic_method.method);
            button.innerHTML = automatic_method.method;

            let container = document.createElement('li');
            container.classList.add('nav-link');
            container.appendChild(button);

            this.controls.appendChild(container);
        }

        this.contents.innerHTML = "";
        for ( let automatic_method of data ) {
            let container = document.createElement('DIV');
            container.setAttribute('data-id', 'method_' + automatic_method.method);
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
            container.appendChild(form.dom);
            container.appendChild(frame);

            this.contents.appendChild(container);
        }

        let connector = new TabConnector();
        connector.add_buttons(this.controls);
        connector.add_contents(this.contents);

        this.connector = connector;
    }

    async add_services(endpoint) {

        try {
            const response = await page.fetch(endpoint);
            const success = await response.json();

            this.set_data(success);

        } catch ( exception ) {
            page.handle_exception(exception);
        }


    }


}