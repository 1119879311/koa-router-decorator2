"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipTranfromMiddleWare = exports.Pipe = void 0;
const Util_1 = require("./Util");
class Pipe {
}
exports.Pipe = Pipe;
function pipTranfromMiddleWare(instance, methodName, ...middlewares) {
    return middlewares.map((itme) => {
        return async (ctx, next) => {
            let option = (0, Util_1.getContextOption)(ctx, next, instance, methodName);
            await itme.apply(option);
            await next();
        };
    });
}
exports.pipTranfromMiddleWare = pipTranfromMiddleWare;
