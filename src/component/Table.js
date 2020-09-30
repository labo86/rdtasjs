class Table extends Element {

    get_view_button(row) {
        return row.getElementsByClassName('view_button')[0];
    }

    get row_element() {
        let template_id = this.element.id + '_row';
        return Element.importNode(template_id);
    }

    get update_button() {
        let button_id = this.element.id + '_update_button';
        return new Button(document.getElementById(button_id));
    }

    get body() {
        let table = this.element;
        return table.getElementsByTagName('TBODY')[0];
    }
    get head() {
        let table = this.element;
        return table.getElementsByTagName('THEAD')[0];
    }
    get column_count() {
        let head = this.head;
        return head.rows[0].cells.length;
    }
    clear() {
        let body = this.body
        body.innerHTML = '';
    }
    set_message(message) {
        let column_count = this.column_count;
        this.clear();
        let row_html = '<td colspan="'+ column_count +'"><div class="text-center">' + message + '</div></td>';
        let row = this.body.insertRow();
        row.innerHTML = row_html;
    }
    set_alert(message) {
        let column_count = this.column_count;
        this.clear();
        let row_html = '<td colspan="'+ column_count +'"><div class="alert alert-danger text-center" role="alert">' + message + '</div></td>';
        this.insert_row(row_html);
    }

    set_status_waiting() {
        let text = this.element.getAttribute('data-waiting-text');
        this.set_message(text);
        this.update_button.set_status_waiting();
    }
}