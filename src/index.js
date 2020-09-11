/**
 * Esta function agrega un HTML al final de lo que tiene un elemento.
 * LO que hace es crear un elemento interno y asignarle un innerHTML.
 * Después toma su coontenido como HTMLElements y lo agrega al final del contenido actual.
 *
 * @param {HTMLElement} element
 * @param {string} content
 */
function appendToInnerHtml(element, content) {
	let new_content = document.createElement('div');
	new_content.innerHTML = content;

	while (new_content.firstChild) {
		element.appendChild(new_content.firstChild);
	}
}

/**
 *
 * @param {HTMLElement} element
 * @param {string} name
 */
function switchVisibility(element, name) {
	for ( let child of element.children ) {
		if ( !child.hasAttribute('data-page-name') )
			child.style.display = 'none';
		else if ( child.getAttribute('data-page-name') === name ) {
			child.style.display = null;
		} else {
			child.style.display = 'none';
		}
	}
}

/**
 * Convierte un object a search params
 * @param {Object} object
 */
function objectToSearchParams(object) {
	let element_list = [];
	for ( let key in object ) {
		element_list.push(key + '=' + object[key]);

	}
	return element_list.join('&');
}

/**
 * Agrega un element a un element FormData
 * @param {FormData} form
 * @param {Object} object
 */
function formAddParams(form, object) {
	for ( let key in object ) {
		form.set(key, object[key]);
	}
	return form;
}

function openBlobInNewWindow(blob) {
	let file = window.URL.createObjectURL(blob);
	window.open(file);
}

export {formAddParams};
export {openBlobInNewWindow};
export {switchVisibility};
export {objectToSearchParams};
export {appendToInnerHtml};