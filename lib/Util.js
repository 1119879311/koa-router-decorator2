"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContextOption = exports.getArgs = exports.getContext = exports.isNotBaseType = void 0;
const Constant_1 = require("./Constant");
function isNotBaseType(name) {
    return !Constant_1.typeExInculeds.includes(name);
}
exports.isNotBaseType = isNotBaseType;
function getContext(instance, methodName, metaKey, isClass) {
    const fn = (metaKey, isClass) => isClass
        ? Reflect.getMetadata(metaKey, instance.constructor)
        : Reflect.getMetadata(metaKey, instance, methodName);
    return metaKey ? fn(metaKey, isClass) : fn;
}
exports.getContext = getContext;
// 获取控制器上的参数 和 类型
function getArgs(ctx, next, instance, methodName) {
    const params = getContext(instance, methodName, Constant_1.PARAMS_META_KEY) || []; // 获取真实参数
    const Iparams = getContext(instance, methodName, Constant_1.DesignParamtypes); // 获取参数类型
    const args = params.reduce((result, item, index) => {
        if (isNotBaseType(Iparams[index].name)) {
            result.push(({ value: item(ctx, next, instance, methodName), type: Iparams[index] }));
        }
        return result;
    }, []);
    return args;
}
exports.getArgs = getArgs;
function getContextOption(ctx, next, instance, methodName) {
    return {
        get: getContext(instance, methodName),
        getArgs: () => getArgs(ctx, next, instance, methodName),
        ctx,
        next,
    };
}
exports.getContextOption = getContextOption;
