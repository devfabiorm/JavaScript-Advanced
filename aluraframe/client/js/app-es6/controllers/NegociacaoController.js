import {Negociacao} from '../models/Negociacao';
import {Mensagem} from '../models/Mensagem';
import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {Bind} from '../helpers/Bind';
import {DateHelper} from '../helpers/DateHelper';
import {NegociacaoService} from '../services/NegociacaoService';

class NegociacaoController {

    constructor(){

        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._ordemAtual = '';

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, ['adiciona', 'esvazia', 'ordena', 'inverteOrdem']);
        
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, ['texto']);

        this._service = new NegociacaoService();

        this._init();
    }
    
    _init(){
        
        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
        
        setInterval(() => {
    
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event){

        event.preventDefault(event);

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(msg => {

                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = msg;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {
        
        this._service
            .apaga()
            .then(msg => {
                
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = msg;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    importaNegociacoes(){

        this._service.importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => 
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {

        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
        }else{
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();

export function currentIntance(){

    return negociacaoController;
}