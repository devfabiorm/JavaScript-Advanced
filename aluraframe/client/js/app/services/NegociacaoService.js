class NegociacaoService {
    
    constructor(){

        this._http = new HttpService();
    }
    obterNegociacoesDaSemana() {

            return this._http.get("negociacoes/semana")
            .then(objetos => {
                return objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => {console.log(erro);
            throw new Error("Não foi possível obter as negociações da semana.")
            });
    }

    obterNegociacoesDaSemanaAnterior() {

        return this._http.get("negociacoes/anterior")
        .then(objetos => {
            return objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
        })
        .catch(erro => {console.log(erro);
        throw new Error("Não foi possível obter as negociações da semana anterior.")
        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return this._http.get("negociacoes/retrasada")
        .then(objetos => {
            return objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
        })
        .catch(erro => {console.log(erro);
        throw new Error("Não foi possível obter as negociações da semana retrasada.")
        });
    }

    obterNegociacoes(){

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
            ])
            .then(arrays => { 
            return arrays.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            })
            .catch(erro => { throw new Error(erro)
        });
    }
}