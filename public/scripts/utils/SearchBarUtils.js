import { DomBaseClass } from "../template/DomBaseClass.js";

export class SearchBarUtils extends DomBaseClass{
    constructor(searchBar){
        super()
        this._searchBar = searchBar
        this._input = this._searchBar.querySelector('input')
        this._inputCross = this._searchBar.querySelector('.input-cross')
        this._inputCrossActive = false
        this.init()
    }

    init(){

        this._input.addEventListener('input', () => {
            this._showInputCross()
        })

        this._inputCross.addEventListener('click',() => this._inputDeleteContent())

    }

    _inputDeleteContent(){
        this._input.value = ''
        this._inputCross.classList.add('hidden')
    }
    
    _showInputCross(){
        if(this._input.value != '' && this._inputCross.classList.contains('hidden')){
           this._inputCross.classList.remove('hidden')
           this._inputCrossActive = true
        } else if(this._inputCrossActive && this._input.value == ''){
            this._inputCross.classList.add('hidden')
        }
    }
}