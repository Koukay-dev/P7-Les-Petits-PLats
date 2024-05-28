import { SearchEngine } from "./SearchEngine.js";
import { AutocompleteUI } from "./AutocompleteUI.js";
import { Filters } from "../template/Filters.js";

/**
 * Classe Search pour gérer la recherche, l'autocomplétion et les filtres.
 */
export class Search{
    /**
     * Crée une instance de Search.
     * @param {Array<Object>} recipes - La liste des recettes.
     * @param {Object<HTMLElement>} searchBars - Les barres de recherche pour l'autocomplétion.
     * @param {HTMLElement} FilterWrapper - L'élément contenant les filtres.
     */
    constructor(recipes, searchBars, FilterWrapper){
        this._recipes = recipes
        this._searchBars = searchBars
        this._filterWrapper = FilterWrapper

        this._engine = new SearchEngine(this._recipes)
        this._autocompleteUI = new AutocompleteUI(this._searchBars)
        this._filters = new Filters(this._FilterWrapper)
    }

    _init(){
        this._searchBars.forEach(searchBar => {
            searchBar.addEventListener('input', () => {
                
            })
        });
    }

    search(query){
        if(query === ''){
            this._engine.resetCurrentRecipes()
        }
        return this._engine.search(query)
    }

    filterSearch(query, filtertype){ //doit retourner la liste des recettes
        
    }

    addFilter(){

    }

    removeFilter(){

    }
    
}