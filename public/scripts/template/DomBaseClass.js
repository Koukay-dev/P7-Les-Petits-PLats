
export class DomBaseClass {
    /**
     * Convert a String to a HTML element
     * 
     * @param {String} StringWithHtml 
     * @returns {HTMLElement}
     */
    _convertToHTML(StringWithHtml) {
        const range = document.createRange()
        const documentFragment = range.createContextualFragment(StringWithHtml)
        return documentFragment.firstElementChild
    }
}