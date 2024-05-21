import { recipes } from "./data/recipe.js" 
import { Recipe }  from "./scripts/models/Recipe.js" 
import { RecipeCard } from "./scripts/template/RecipeCard.js"
import { SearchBar } from "./scripts/template/SearchBar.js"


class RecipesApp {
    constructor(recipes){
        this._recipes = recipes
        this._recipeSection = document.getElementById('recipes-main')
        this._recipeCount = document.getElementById('recipe-count')
        this._searchBars = document.querySelectorAll('.search-bar')
    }

    main(){

        const fragment = document.createDocumentFragment();
        var recipesFound = this._recipes.length
        this._updateRecipeNumber(recipesFound)
        this._recipes.forEach(recipe => {
            let recipeNew = new Recipe(recipe);
            let recipeCard = new RecipeCard(recipeNew);
            fragment.appendChild(recipeCard.createThumbnail());
        });
        this._addSearchBarsEvent()
        // Ajouter le fragment au DOM en une seule opération
        this._recipeSection.appendChild(fragment);
    }

    _addSearchBarsEvent(){
        this._searchBars.forEach((searchBar) => {
            new SearchBar(searchBar)
        })
    }

    _updateRecipeNumber(number){
        if(number <= 0){
            this._recipeCount.innerText = `00 recette`
        }else if(number === 1){
            this._recipeCount.innerText = `01 recette`
        }else if(number < 10){
            this._recipeCount.innerText = `0${number} recettes`
        } else{
            this._recipeCount.innerText = `${number} recettes`
        } 
    }
}


const app = new RecipesApp(recipes)
app.main()

