import { SearchEngine } from "./SearchEngine";
// import { SearchUI } from "./SearchUI";

export class Search{
    constructor(recipes, searchBars ){
        this._recipes = recipes
        this._searchBars = searchBars

        this._engine = new SearchEngine(this._recipes)
        //this._searchUI = new SearchUI(this._searchBars)
    }
}