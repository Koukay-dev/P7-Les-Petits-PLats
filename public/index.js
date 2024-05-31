import { recipes } from "./data/recipe.js" 
import { Recipe }  from "./scripts/models/Recipe.js" 
import { RecipeCard } from "./scripts/template/RecipeCard.js"
import { SearchBarUtils } from "./scripts/utils/SearchBarUtils.js"
import { FiltersUtils } from "./scripts/utils/FiltersUtils.js"
import { Search } from "./scripts/search/Search.js"


class RecipesApp {
    constructor(recipes){
        this._recipes = recipes
        this._recipeSection = document.getElementById('recipes-main')
        this._recipeCount = document.getElementById('recipe-count')
        this._searchBars = document.querySelectorAll('.search-bar')
        this._filtersDOM = document.querySelectorAll('.filterSearch')
        this._appliedFilterWrapper = document.getElementById('appliedFilters')
        this._search = new Search(this._recipes, this._searchBars, this._appliedFilterWrapper)
    }

    init(){
         
        this._updateDomRecipes(this._recipes)
        this._addSearchBarsEvent()
        this._addFiltersEvent()
        
    }


    _updateDomRecipes(recipes){
        const fragment = document.createDocumentFragment()
        var recipesFound = recipes.length
        this._updateRecipeNumber(recipesFound)
        recipes.forEach(recipe => {
            let recipeNew = new Recipe(recipe)
            let recipeCard = new RecipeCard(recipeNew)
            fragment.appendChild(recipeCard.createThumbnail())
        });
        this._recipeSection.innerHTML = ''
        this._recipeSection.appendChild(fragment)
    }


    _addSearchBarsEvent(){

        this._searchBars.forEach(searchBar => {

            new SearchBarUtils(searchBar)
            
            if(!searchBar.dataset.filtertype){ // Recherche principale
                const input = searchBar.querySelector('input')
                input.addEventListener('input',()=>{
                    if(input.value.length >= 3){
                        this._updateDomRecipes(this._search.search(input.value))
                    } else {
                        this._updateDomRecipes(this._search.search(''))
                    }
                })
                searchBar.querySelector('.input-cross').addEventListener('click',() => {
                    this._updateDomRecipes(this._search.search(''))
                })

            }
        })
    }

    _addFiltersEvent(){
        this._filtersDOM.forEach((filterDOM) => {
            new FiltersUtils(filterDOM)

            const searchBar  = filterDOM.querySelector('.search-bar')
            const input = searchBar.querySelector('input')
            var filterType = searchBar.dataset.filtertype
        
            input.addEventListener('input', () => this._search.filterSearch(input.value, filterDOM, filterType))
            searchBar.querySelector('.input-cross').addEventListener('click',() => this._search.filterSearch('', filterDOM, filterType))
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
app.init()

