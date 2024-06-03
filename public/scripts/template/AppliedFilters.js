import { DomBaseClass } from './DomBaseClass.js'

export class AppliedFilters extends DomBaseClass {
    constructor(wrapper) {
        super()
        this._wrapper = wrapper
        this._filters = []
    }

    addFilter(filter) {
        if (!this._filters.includes(filter)) {
            const newFilter = /*html*/ `
                <li data-filterName='${filter}'>${filter} <img data-btn='remove' src="./assets/img/logo/black_cross.svg" alt="effacer filtre"/></li>
                `
            this._filters.push(filter)
            this._wrapper.appendChild(this._convertToHTML(newFilter))
        }
    }

    removeFilter(filterToRemove) {
        if (this._filters.includes(filterToRemove)) {
            this._filters = this._filters.filter(
                (currentFilter) => currentFilter !== filterToRemove
            )
            const filterToRemoveLi = this._wrapper.querySelector(
                `li[data-filtername="${filterToRemove}"]`
            )
            if (filterToRemoveLi) {
                this._wrapper.removeChild(filterToRemoveLi)
            }
        }
    }
}
