export class AutocompleteUI{
    constructor(searchBars, filters){
        this._searchBars = searchBars

        this._filters = filters
    }

    updateFilters(updatedFilters){
        this._filters = updatedFilters
    }
    
}