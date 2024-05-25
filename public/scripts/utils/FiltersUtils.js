
export class FiltersUtils {
    constructor(filter){
        this._filter = filter
        this._filterTrigger = this._filter.querySelector('.filterOpeningTrigger')
        this._filterOpenContent = this._filter.querySelector('.filterOpenContent')
        this._init()
    }

    _init(){
        this._filterTrigger.addEventListener('click', () => this._OpenCloseFilter())
    }

    _OpenCloseFilter(){
        if(this._filterOpenContent.classList.contains('hidden')){
            this._filterOpenContent.classList.remove('hidden')
        }else {
            this._filterOpenContent.classList.add('hidden')
        }
    }

}