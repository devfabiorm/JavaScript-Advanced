"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: "obterNegociacoesDaSemana",
        value: function obterNegociacoesDaSemana() {
            console.log("executei semana");
            return this._http.get("negociacoes/semana").then(function (objetos) {
                return objetos.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana.");
            });
        }
    }, {
        key: "obterNegociacoesDaSemanaAnterior",
        value: function obterNegociacoesDaSemanaAnterior() {
            console.log("executei semana passada");
            return this._http.get("negociacoes/anterior").then(function (objetos) {
                return objetos.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana anterior.");
            });
        }
    }, {
        key: "obterNegociacoesDaSemanaRetrasada",
        value: function obterNegociacoesDaSemanaRetrasada() {
            console.log("executei semana retrasada");
            return this._http.get("negociacoes/retrasada").then(function (objetos) {
                return objetos.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Não foi possível obter as negociações da semana retrasada.");
            });
        }
    }, {
        key: "obterNegociacoes",
        value: function obterNegociacoes() {

            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (arrays) {

                return arrays.reduce(function (arrayAchatado, array) {
                    return arrayAchatado.concat(array);
                }, []);
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: "cadastra",
        value: function cadastra(negociacao) {

            return ConnectionFactory.getConnection().then(function (conexao) {
                return new NegociacaoDao(conexao);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação cadastrada com sucesso';
            }).catch(function () {
                throw new Error('Erro ao cadastrar negociacao');
            });
        }
    }, {
        key: "lista",
        value: function lista() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Erro ao obter as negociações do IndexDB');
            });
        }
    }, {
        key: "importa",
        value: function importa(listaAtual) {

            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExiste) {
                        return negociacao.isEquals(negociacaoExiste);
                    });
                });
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: "apaga",
        value: function apaga() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function (msg) {
                return msg;
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Erro ao apagar negociações');
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map