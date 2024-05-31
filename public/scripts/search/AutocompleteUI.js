import { DomBaseClass } from "../template/DomBaseClass.js"

export class AutocompleteUI extends DomBaseClass {
    constructor(searchBars, filters) {
        super()
        this._searchBars = searchBars

        this._filters = filters
        this._appliedFilters = []
    }

    removeAppliedFilter(filterToRemove) {
        this._appliedFilter = this._appliedFilter.filter((appliedFilter) => appliedFilter !== filterToRemove.toLowerCase())
    }

    addAppliedFilter(filter) {
        filter = filter.toLowerCase()
        if(!this._appliedFilter.includes(filter)){
            this._appliedFilter.push(filter)
        }
    }

    appendToDOM(autocompleteDOM, listFilters){
        
        const fragment = document.createDocumentFragment()
        listFilters.forEach(filter => {
            const node = /* html */ `
                <li>${filter}</li>
            `
            fragment.appendChild(this._convertToHTML(node))
        });
        autocompleteDOM.innerHTML = ''
        autocompleteDOM.appendChild(fragment)
        
    }

    search(query, filterType) {
        const nonAppliedFilters = this._getFiltersbyType(filterType).filter(
            (filter) =>
                !this._appliedFilters.some(
                    (appliedFilter) => appliedFilter === filter
                )
        )
        return nonAppliedFilters.filter(
            (filter) => filter.toLowerCase().includes(query.toLowerCase()) 
        )
    }
    
    _getFiltersbyType(type) {
        return this._filters[type]
    }
}
