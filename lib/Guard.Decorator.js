"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardTranformsMiddleWare = exports.getGuard = exports.Guard = void 0;
const Constant_1 = require("./Constant");
const Util_1 = require("./Util");
function Guard(...middlewares) {
    return function (objectOrFunction, methodName) {
        const oldMiddleware = Reflect.getMetadata(Constant_1.GUARD_META_KEY, objectOrFunction, methodName) || [];
        Reflect.defineMetadata(Constant_1.GUARD_META_KEY, [...oldMiddleware, ...middlewares], objectOrFunction, methodName);
    };
}
exports.Guard = Guard;
function getGuard(instance, methodName) {
    let classMiddleWare = Reflect.getMetadata(Constant_1.GUARD_META_KEY, instance.constructor) || [];
    let methodNameMiddleWare = Reflect.getMetadata(Constant_1.GUARD_META_KEY, instance, methodName) || [];
    //这里需要处理成中间的形式
    return GuardTranformsMiddleWare(instance, methodName, ...classMiddleWare, ...methodNameMiddleWare);
}
exports.getGuard = getGuard;
function GuardTranformsMiddleWare(instance, methodName, ...middlewares) {
    return middlewares.map((itme) => {
        return async (ctx, next) => {
            let res = await itme((0, Util_1.getContextOption)(ctx, next, instance, methodName));
            if (res === false) {
                throw new Error("Intercept the guard");
            }
            await next();
        };
    });
}
exports.GuardTranformsMiddleWare = GuardTranformsMiddleWare;
