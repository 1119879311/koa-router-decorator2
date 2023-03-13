"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContext = exports.Next = exports.Header = exports.Body = exports.Param = exports.Query = exports.Res = exports.Req = exports.Ctx = exports.getMothodParameter = exports.factroyParameter = void 0;
require("reflect-metadata");
const Constant_1 = require("./Constant");
const Util_1 = require("./Util");
// 方法参数
function factroyParameter(fn) {
    return function (target, methodName, paramsIndex) {
        let meta = Reflect.getMetadata(Constant_1.PARAMS_META_KEY, target, methodName) || [];
        // meta.push({ methodName, fn, paramsIndex });
        meta.unshift(fn);
        Reflect.defineMetadata(Constant_1.PARAMS_META_KEY, meta, target, methodName);
    };
}
exports.factroyParameter = factroyParameter;
function getMothodParameter(instance, key) {
    return Reflect.getMetadata(Constant_1.PARAMS_META_KEY, instance, key) || [];
}
exports.getMothodParameter = getMothodParameter;
const Ctx = () => factroyParameter((ctx) => ctx);
exports.Ctx = Ctx;
const Req = () => factroyParameter((ctx) => ctx.request);
exports.Req = Req;
const Res = () => factroyParameter((ctx) => ctx.response);
exports.Res = Res;
const Query = (field) => factroyParameter((ctx) => field ? ctx.request.query[field] : Object.assign({}, ctx.request.query));
exports.Query = Query;
const Param = () => factroyParameter((ctx) => ctx.request.param);
exports.Param = Param;
const Body = () => factroyParameter((ctx) => ctx.request.body);
exports.Body = Body;
const Header = (field) => factroyParameter((ctx) => field ? ctx.request.headers[field] : ctx.request.headers);
exports.Header = Header;
const Next = () => factroyParameter((_, next) => next);
exports.Next = Next;
// 获取当前类型方法的 元数据
const GetContext = (metaKey, isClass) => factroyParameter((_, next, instance, methodName) => (0, Util_1.getContext)(instance, methodName, metaKey, isClass));
exports.GetContext = GetContext;
