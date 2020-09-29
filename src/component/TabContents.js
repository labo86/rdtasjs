class TabContents extends Element {

    get pane_list() {
        return this.element.querySelectorAll('[role="tabpanel"]');
    }

    change_page(page_name) {
        let pane_list = this.pane_list;
        for ( let pane of pane_list ) {
            if ( pane.id === page_name )
                pane.classList.add('active');
            else
                pane.classList.remove('active');
        }
    }
}