export class SearchEngine {
    constructor(recipes) {
        this._recipes = recipes
        this._appliedFilter = []
        this._currentRecipes = this._recipes
        
        // Liste des Filtres            
        this._initFilterList()
        this._updateFiltersList()
        
        this._lastQuery = ''

        
    }

    // ========= Getters =========
    get currentRecipes(){
        return this._currentRecipes
    }

    get appliedFilters(){
        return this._appliedFilter
    }

    get allFilters(){
        return this._filters
    }

    // ========= Public =========


    resetCurrentRecipes(){
        this._currentRecipes = this._recipes
    }

    addFilter(filter){
        filter = filter.toLowerCase()
        if(!this._appliedFilter.includes(filter)){
            this._appliedFilter.push(filter)
            this._updateCurrentRecipeWithFilters() //Mets à jour this._currentRecipes 
            this._updateFiltersList()
        }
        
    }

    removeFilter(filterToRemove){
        this._appliedFilter = this._appliedFilter.filter((appliedFilter) => appliedFilter !== filterToRemove.toLowerCase())

        //Mets à jour this._currentRecipes
        this.resetCurrentRecipes()
        this._updateCurrentRecipeWithFilters()
        this._updateFiltersList()

        this.search(this._lastQuery)     
    }

    search(query){
        if(this._lastQuery.length > query.length){
            this.resetCurrentRecipes()
        }
        // La recherche se fait sur le titre, la description, et les ingredients
        this._lastQuery = query
        query = query.toLowerCase()
        this._currentRecipes = this._currentRecipes.filter((recipe) => {
            const nameMatch = recipe.name.toLowerCase().includes(query)
            const descriptionMatch = recipe.description.toLowerCase().includes(query)
            const ingredientsMatch = recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(query)
            )
            return nameMatch || descriptionMatch || ingredientsMatch
        })
        this._updateCurrentRecipeWithFilters()
        this._updateFiltersList()

        return this._currentRecipes
    }

    

    // ========= Private =========
    _initFilterList(){
        this._filtersIngredients = []
        this._filtersAppliance = []
        this._filtersUstensils = []
        this._filters = { 
            ingredients: this._filtersIngredients,
            appliances: this._filtersAppliance,
            ustensils: this._filtersUstensils 
        }
    }

        // initialisation de la liste des filtres
    _updateFiltersList() {
        this._initFilterList()
        this._currentRecipes.forEach((recipe) => {
            this._updateIngredientsFilters(recipe)
            this._updateApplianceFilters(recipe)
            this._updateUstensilsFilters(recipe)
        })
    }

    _alreadyIncludedinList(list, stringToCheck){ // Check pour ne pas avoir de doublons à cause des majuscules
        return list.some((item) => item.toLowerCase() === stringToCheck.toLowerCase())
    }

    _updateIngredientsFilters(recipe) {
        recipe.ingredients.forEach((ingredient) => {
            if (!this._alreadyIncludedinList(this._filtersIngredients, ingredient.ingredient)) {
                this._filtersIngredients.push(ingredient.ingredient)
            }
        })
    }

    _updateApplianceFilters(recipe) {
        const appliance = recipe.appliance
        if (!this._alreadyIncludedinList(this._filtersAppliance, appliance)) {
            this._filtersAppliance.push(appliance)
        }
    }

    _updateUstensilsFilters(recipe) {
        recipe.ustensils.forEach((ustensil) => {
            if (!this._alreadyIncludedinList(this._filtersUstensils, ustensil)) {
                this._filtersUstensils.push(ustensil)
            }
        })
    }
        // initialisation fin

    _updateCurrentRecipeWithFilters(){
        this._currentRecipes = this._currentRecipes.filter((recipe) => {
            return this._appliedFilter.every(appliedFilter => {

                const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === appliedFilter)
                const applianceMatch = recipe.appliance.toLowerCase() === appliedFilter
                const ustensilMatch = recipe.ustensils.some(ustensil => ustensil.toLowerCase() === appliedFilter)

                return ingredientsMatch || applianceMatch || ustensilMatch
            })          
        })
    }
}
