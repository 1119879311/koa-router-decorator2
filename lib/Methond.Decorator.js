"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL = exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.RequestFactory = void 0;
require("reflect-metadata");
const Constant_1 = require("./Constant");
const Controller_Decorator_1 = require("./Controller.Decorator");
// 方法
function RequestFactory(methond) {
    return function (path) {
        return function (target, methodName, dec) {
            let classMeta = (0, Controller_Decorator_1.getControllerMeta)(target);
            let methondMeta = { path: path || "", methond };
            classMeta.routers[methodName] = methondMeta;
            Reflect.defineMetadata(Constant_1.CONTROLLER_META_KEY, classMeta, target.constructor);
        };
    };
}
exports.RequestFactory = RequestFactory;
exports.GET = RequestFactory("get");
exports.POST = RequestFactory("post");
exports.PUT = RequestFactory("put");
exports.DELETE = RequestFactory("delete");
exports.ALL = RequestFactory("all");
