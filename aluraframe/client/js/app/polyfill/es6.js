"use strict";

if (!Array.prototype.includes) {
    //Se ele existir não adiciona
    console.log("Polyfill para Array.includes aplicado");

    Array.prototype.includes = function (elemento) {
        return this.indexOf(elemento) != -1;
    };
}
//# sourceMappingURL=es6.js.map