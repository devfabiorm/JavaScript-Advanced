class ListaNegociacoes{

    constructor(armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;
        }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        //Reflect.apply(this._armadilha, this._contexto, [this]);
        this._armadilha(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        
        this._negociacoes = [];
        //Reflect.apply(this._armadilha, this._contexto, [this]);
        this._armadilha(this);
    }
}