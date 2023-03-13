"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeExInculeds = exports.DesignParamtypes = exports.GUARD_META_KEY = exports.MIDDLEWARES_META_KEY = exports.PARAMS_META_KEY = exports.MOTHOD_META_KEY = exports.CONTROLLER_META_KEY = void 0;
exports.CONTROLLER_META_KEY = Symbol("controller_meta_key");
exports.MOTHOD_META_KEY = Symbol("method_meta_key");
exports.PARAMS_META_KEY = Symbol("params_meta_key");
exports.MIDDLEWARES_META_KEY = Symbol("middlewares_meta_key");
exports.GUARD_META_KEY = Symbol("guard_meta_key");
exports.DesignParamtypes = "design:paramtypes"; //内置的获取构造函数的参数
// 判定是否基础类型
exports.typeExInculeds = [
    "String",
    "Function",
    "Array",
    "Number",
    "Date",
    "RegExp",
    "Boolean",
    "Symbol",
    "Object",
    "Null",
    "Undefined",
];
