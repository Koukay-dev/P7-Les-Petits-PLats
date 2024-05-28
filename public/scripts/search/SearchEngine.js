export class SearchEngine {
    constructor(recipes) {
        this._recipes = recipes
        this._appliedFilter = []
        this._currentRecipes = this._recipes
        
        // Liste des Filtres            
        this._filtersIngredients = []
        this._filtersAppliance = []
        this._filtersUstensils = []
        this._filters = { 
            ingredients: this._filtersIngredients,
            appliances: this._filtersAppliance,
            ustensils: this._filtersUstensils 
        }

        this._initFiltersList()
    }

    // ========= Getters =========

    get appliedFilter(){
        return this._appliedFilter
    }

    getFiltersbyType(type){
        return this._filters[type]
    }


    // ========= Public =========


    

    addFilter(filter){
        if(!this._appliedFilter.includes(filter.toLowerCase())){
            this._appliedFilter.push(filter.toLowerCase())
            this.updateCurrentRecipeWithFilters() //Mets à jour this._currentRecipes 
        }
        
    }

    removeFilter(filterToRemove){
        this._appliedFilter.filter((appliedFilter) => appliedFilter !== filterToRemove)

        if(this._appliedFilter.length === 0){ //Mets à jour this._currentRecipes
            this.resetCurrentRecipes()
        }else{
            this.updateCurrentRecipeWithFilters()  
        }
        
    }

    search(query){
        // La recherche se fait sur le titre, la description, et les ingredients
        query = query.toLowerCase()
        this._currentRecipes = this._currentRecipes.filter((recipe) => {
            const nameMatch = recipe.name.toLowerCase().includes(query)
            const descriptionMatch = recipe.description.toLowerCase().includes(query)
            const ingredientsMatch = recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(query)
            )
            return nameMatch || descriptionMatch || ingredientsMatch
        })
        console.log(this)
    }

    

    // ========= Private =========
    

        // initialisation de la liste des filtres
    _initFiltersList() {
        this._recipes.forEach((recipe) => {
            this._updateIngredientsFilters(recipe)
            this._updateApplianceFilters(recipe)
            this._updateUstensilsFilters(recipe)
        })
    }

    _updateIngredientsFilters(recipe) {
        recipe.ingredients.forEach((ingredient) => {
            if (!this._filtersIngredients.includes(ingredient.ingredient)) {
                this._filtersIngredients.push(ingredient.ingredient)
            }
        })
    }

    _updateApplianceFilters(recipe) {
        if (!this._filtersAppliance.includes(recipe.appliance)) {
            this._filtersAppliance.push(recipe.appliance)
        }
    }

    _updateUstensilsFilters(recipe) {
        recipe.ustensils.forEach((ustensil) => {
            if (!this._filtersUstensils.includes(ustensil)) {
                this._filtersUstensils.push(ustensil)
            }
        })
    }
        // initialisation fin

    _updateCurrentRecipeWithFilters(){
        this._currentRecipes = this._currentRecipes.filter((recipe) => {
            return this._appliedFilter.some(appliedFilter => {
                const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === appliedFilter)
                const applianceMatch = recipe.appliance.toLowerCase() === appliedFilter
                const ustensilMatch = recipe.ustensils.some(ustensil => ustensil.toLowerCase() === appliedFilter)
                return ingredientsMatch || applianceMatch || ustensilMatch
            })          
        })
    }
    
    _resetCurrentRecipes(){
        this._currentRecipes = this._recipes
    }
}
