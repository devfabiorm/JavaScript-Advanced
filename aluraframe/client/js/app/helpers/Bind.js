"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind = function Bind(model, view, props) {
    _classCallCheck(this, Bind);

    var proxy = ProxyFactory.create(model, props, function (model) {
        return view.update(model);
    });

    view.update(model);

    return proxy;
};
//# sourceMappingURL=Bind.js.map