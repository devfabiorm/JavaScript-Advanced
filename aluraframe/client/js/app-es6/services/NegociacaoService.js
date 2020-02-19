import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {
    
    constructor(){

        this._http = new HttpService();
    }
    obterNegociacoesDaSemana() {
        console.log("executei semana");
            return this._http.get("negociacoes/semana")
            .then(objetos => {
                return objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => {console.log(erro);
            throw new Error("Não foi possível obter as negociações da semana.")
            });

            
    }

    obterNegociacoesDaSemanaAnterior() {
        console.log("executei semana passada");
        return this._http.get("negociacoes/anterior")
        .then(objetos => {
            return objetos.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
        })
        .catch(erro => {console.log(erro);
        throw new Error("Não foi possível obter as negociações da semana anterior.")
        });

        
    }

    obterNegociacoesDaSemanaRetrasada() {
        console.log("executei semana retrasada");
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

    cadastra(negociacao){

        return ConnectionFactory
            .getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação cadastrada com sucesso')
            .catch(() => {
                throw new Error('Erro ao cadastrar negociacao')
            });
    }

    lista(){

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao obter as negociações do IndexDB');
            })
    }

    importa(listaAtual){

        return this.obterNegociacoes()
            .then(negociacoes => negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExiste => 
                    negociacao.isEquals(negociacaoExiste))))
            .catch(erro => {
                throw new Error(erro);
            })
    }

    apaga(){

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(msg => msg)
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao apagar negociações')
            });
    }
}