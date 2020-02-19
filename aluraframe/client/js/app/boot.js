'use strict';

System.register(['./controllers/NegociacaoController', './polyfill/fetch'], function (_export, _context) {
  "use strict";

  var currentIntance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentIntance = _controllersNegociacaoController.currentIntance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = currentIntance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map