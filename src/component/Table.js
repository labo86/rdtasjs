class Table extends Element {

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

    set_one_row(element) {
        this.clear();
        let column_count = this.column_count;
        let cell = document.createElement('td');
        cell.setAttribute('colspan', column_count);
        cell.appendChild(element);

        let row = this.body.insertRow()
        row.appendChild(cell);
    }
}