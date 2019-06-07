class NegociacaoController {
    constructor(){

        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, ['adiciona', 'esvazia']);
        
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, ['texto']);

    }

    adiciona(event){

        event.preventDefault(event);
        
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso.";
        
        this._limpaFormulario();
    }

    apaga() {
        
        this._listaNegociacoes.esvazia();
    }

    importaNegociacoes(){

        let service = new NegociacaoService();

       Promise.all([
        service.obterNegociacoesDaSemana(),
        service.obterNegociacoesDaSemanaAnterior(),
        service.obterNegociacoesDaSemanaRetrasada()
       ])
       .then(negociacoes => {negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
       .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        
        this._mensagem.texto = "Negociações importadas com sucesso."
        })
       .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}