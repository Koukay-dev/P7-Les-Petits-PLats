import { DomBaseClass } from '../template/DomBaseClass.js'

export class AutocompleteUI extends DomBaseClass {
    constructor(filters) {
        super()
        this._filters = filters
        this._appliedFilters = []
    }

    updateFilters(filters) {
        this._filters = filters
    }

    removeAppliedFilter(filterToRemove) {
        this._appliedFilters = this._appliedFilters.filter(
            (appliedFilter) => appliedFilter !== filterToRemove.toLowerCase()
        )

        // Pour update la liste lors de l'ajout

        const liFilter = document.querySelector(
            `li[data-appliedfiltername="${filterToRemove}"]`
        )
        const appliedFilters = liFilter.closest('.FilterSearch-appliedFilters')
        if (liFilter) {
            appliedFilters.removeChild(liFilter)
        }
    }

    addAppliedFilter(filter, FilterDOM) {
        if (!this._appliedFilters.includes(filter.toLowerCase())) {
            this._appliedFilters.push(filter.toLowerCase())
        }

        // Pour update la liste lors de l'ajout
        const autocompleteDOM = FilterDOM.querySelector('.autocomplete')
        const liFilter = autocompleteDOM.querySelector(
            `li[data-filtername="${filter}"]`
        )
        if (liFilter) {
            autocompleteDOM.removeChild(liFilter)
        }

        const appliedFilters = FilterDOM.querySelector(
            '.FilterSearch-appliedFilters'
        )
        appliedFilters.appendChild(
            this._convertToHTML(
                /* html */ `<li data-appliedfiltername="${filter}">${filter}</li>`
            )
        )
    }

    appendToDOM(autocompleteDOM, listFilters, filterType = false) {
        
        listFilters =
            listFilters.length === 0 ? this.search('' ,filterType) : listFilters
        console.log(listFilters)
        const fragment = document.createDocumentFragment()
        listFilters.forEach((filter) => {
            const li = /* html */ `
                <li data-filtername='${filter}'>${filter}</li>
            `
            fragment.appendChild(this._convertToHTML(li))
        })
        autocompleteDOM.innerHTML = ''
        autocompleteDOM.appendChild(fragment)
    }

    search(query, filterType) {
        const nonAppliedFilters = this._getFiltersbyType(filterType).filter(
            (filter) =>
                !this._appliedFilters.some(
                    (appliedFilter) => appliedFilter === filter.toLowerCase()
                )
        )
        if(query !== ''){
           return nonAppliedFilters.filter((filter) =>
            filter.toLowerCase().includes(query.toLowerCase())
            ) 
        }
        return nonAppliedFilters
        
    }

    _getFiltersbyType(type) {
        if (type) {
            return this._filters[type]
        }
        return []
    }
}
