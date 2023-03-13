"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = exports.setMetadata = void 0;
require("reflect-metadata");
function setMetadata(mataKey, data) {
    return function (objectOrFunction, methodName) {
        Reflect.defineMetadata(mataKey, data, objectOrFunction, methodName);
    };
}
exports.setMetadata = setMetadata;
function getMetadata(mataKey, target, targetKey) {
    return Reflect.getMetadata(mataKey, target, targetKey);
}
exports.getMetadata = getMetadata;
