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

    // Algorithme Principal
    search(query){
        // La recherche se fait sur le titre, la description, et les ingredients
        if(this._lastQuery.length > query.length){
            this.resetCurrentRecipes()
        }
        if(query === ''){
            this._updateCurrentRecipeWithFilters()
            this._updateFiltersList()
            return this._currentRecipes
        }

        this._lastQuery = query
        query = query.toLowerCase()
        
        let newCurrentRecipes = []

        for (let i=0; i < this._currentRecipes.length; i++){
            let recipe = this._currentRecipes[i]

            const nameMatch = () => this._textIncludedInString(recipe.name.toLowerCase(), query)
            const descriptionMatch = () => this._textIncludedInString(recipe.description.toLowerCase(), query)

            const ingredientsMatch = () => {
                for (let ingredientIndex = 0; ingredientIndex < recipe.ingredients.length; ingredientIndex++){
                    if(this._textIncludedInString(recipe.ingredients[ingredientIndex].ingredient.toLowerCase(),query)){
                        console.log(recipe.ingredients[ingredientIndex].ingredient.toLowerCase() +' ?= ' + query) 
                        return true

                    }
                }
                return false
            }

            if(nameMatch() || ingredientsMatch() || descriptionMatch()){                
                newCurrentRecipes.push(recipe)
            } 
        }
        this._currentRecipes = newCurrentRecipes

        this._updateCurrentRecipeWithFilters()
        this._updateFiltersList()

        return this._currentRecipes
    }

    _textIncludedInString(FullText, TestString){
        let charsMatch
        for(let i=0; i<=FullText.length - TestString.length; i++){
            
            charsMatch = 0
            for(let j=0; j < TestString.length; j++){
                if(FullText[i+j] === TestString[j]){
                    charsMatch += 1
                    if(charsMatch === TestString.length){
                        console.log(FullText)
                        console.log('true')
                        return true
                    }
                } else {
                    break
                }
                
            }
        }
        return false
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
