
export class Recipe {
    constructor(recipe) {
        this._id = recipe.id
        this._image = recipe.image
        this._name = recipe.name
        this._servings = recipe.servings
        this._ingredients = recipe.ingredients
        this._time = recipe.time
        this._description = recipe.description
        this._appliance = recipe.appliance
        this._ustensils = recipe._ustensils
    }
    get id() {
        return this._id
    }
    get image() {
        return `./assets/img/recipes/${this._image}`
    }
    get name() {
        return this._name
    }
    get servings() {
        return this._servings
    }

    /**
     * Return an array of object where each object CAN include from one up to three value
     * 
     * Example of a return: 
     * 
     *     [
     *      {
     *          "ingredient" : "Lait de coco",
     *          "quantity" : 400,
     *          "unit" : "ml"
     *      },
     *      {
     *          "ingredient" : "Jus de citron",
     *          "quantity" : 2
     *      },
     *      {
     *          "ingredient": "Glaçons"
     *      }
     *  ] 
     * @returns {Array} An array of objects of each of the ingredient.
    */
    get ingredients() {
        return this._ingredients
    }
    get time() {
        return `${this._time}min`
    }
    get description() {
        return this._description
    }
    get appliance() {
        return this._appliance
    }
    /**
     * Return an array of strings example:
     *  ["cuillère à Soupe", "verres", "presse citron" ]
     * @returns {Array}
     */
    get ustensils() {
        return this._ustensils
    }
}
