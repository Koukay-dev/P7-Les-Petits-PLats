import { DomBaseClass } from "./DomBaseClass.js"

export class RecipeCard extends DomBaseClass {
    constructor(recipe) {
        super()
        this._recipe = recipe
    }

    get recipe() {
        return this._recipe
    }

    createThumbnail() {
        let recipe = this._recipe

        const recipeCard = /*html*/ `
        <article class="relative w-96 h-[731px] rounded-recipe bg-white overflow-hidden shadow-theme">
            <span class='absolute top-4 right-4 bg-theme-yellow py-1 px-3 text-xs rounded-14'>${recipe.time}</span>
            ${this._imgDOM()}
            <div class='mx-6'>
                <h4 class='text-[18px] font-anton my-6'>${recipe.name}</h4>
                <div class='mb-8'>
                    <h5 class='text-xs text-theme-grey tracking-subtitle font-bold mb-4'>RECETTE</h5>
                    <p class='text-sm text-theme-black h-20 text-ellipsis overflow-hidden line-clamp-4'>${recipe.description}</p>
                </div>
                <div>
                    <h5 class='text-xs text-theme-grey tracking-subtitle font-bold mb-4'>INGRÉDIENTS</h5>
                    ${this._createIngredientsDOM()} 
                </div>
            </div>
        </article>
    `

        return this._convertToHTML(recipeCard)
    }

    _imgDOM() {
        return /* html */ `
        <img class='object-cover max-h-64 w-full' src="${this._recipe.image}" alt="${this._recipe.name}" />
        `
    }

    _createIngredientsDOM() {
        const addQuantityUnits = (ingredient) => {
            var unitText = ''
            if (ingredient.quantity) {
                unitText += ingredient.quantity
                if (ingredient.unit) {
                    unitText +=
                        ingredient.unit.length > 3
                            ? ' ' + ingredient.unit
                            : ingredient.unit
                }
            } else {
                unitText += '-'
            }
            return unitText
        }

        const ingredientsDOM = /*html*/ `
        <div class='grid grid-cols-2'>
            ${this._recipe.ingredients.map((ingredient) => {
                    return /* html */ `
                        <div class='mb-5 text-sm font-medium'>
                            <h6 class='text-theme-black'>${ingredient.ingredient ?? '-'}</h6>
                            <span class='text-theme-grey'>${addQuantityUnits(ingredient)}</span>
                        </div>
                    `
                })
                .join('')}
        </div>
        `
        return ingredientsDOM
    }

}
