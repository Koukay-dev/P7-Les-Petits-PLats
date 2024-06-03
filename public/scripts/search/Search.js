import { SearchEngine } from './SearchEngine.js'
import { AutocompleteUI } from './AutocompleteUI.js'
import { AppliedFilters } from '../template/AppliedFilters.js'

/**
 * Classe Search pour gérer la recherche, l'autocomplétion et les filtres.
 */
export class Search {
    /**
     * Crée une instance de Search.
     * @param {Array<Object>} recipes - La liste des recettes.
     * @param {HTMLElement} AppliedFilterWrapper - L'élément qui va contenir les filtres appliqués.
     */
    constructor(recipes, AppliedFilterWrapper) {
        this._recipes = recipes

        this._engine = new SearchEngine(this._recipes)
        this._autocompleteUI = new AutocompleteUI(this._engine.allFilters)
        this._appliedFilters = new AppliedFilters(AppliedFilterWrapper)

    }


    search(query) {
        if (query === '') {
            this._engine.resetCurrentRecipes()
        }
        return this._engine.search(query)
    }


    filterSearch(query, filterDOM, filtertype) {
        
        const autocompleteDOM = filterDOM.querySelector('.autocomplete')

        if (query != '') {
            const matchedFilter = this._autocompleteUI.search(query, filtertype)
            this._autocompleteUI.appendToDOM(autocompleteDOM, matchedFilter)
        } else {
            this._autocompleteUI.appendToDOM(autocompleteDOM, [])
        }
    }

    addFilter(filter, filterDOM) {
        this._engine.addFilter(filter)
        this._autocompleteUI.addAppliedFilter(filter, filterDOM)
        this._appliedFilters.addFilter(filter)
        return this._engine.currentRecipes
    }

    removeFilter(filter) {
        this._engine.removeFilter(filter)
        this._autocompleteUI.removeAppliedFilter(filter)
        this._appliedFilters.removeFilter(filter)
        return this._engine.currentRecipes
    }
}
