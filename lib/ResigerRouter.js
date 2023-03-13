"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResigerRouter = exports.ResigerRouters = void 0;
const Controller_Decorator_1 = require("./Controller.Decorator");
const Guard_Decorator_1 = require("./Guard.Decorator");
const Use_Decorator_1 = require("./Use.Decorator");
const path_1 = __importDefault(require("path"));
const Parameter_Decorator_1 = require("./Parameter.Decorator");
const Pipe_1 = require("./Pipe");
function ResigerRouters(routerIntance, controllerInstance, optons) {
    if (Array.isArray(controllerInstance)) {
        controllerInstance.forEach(itme => ResigerRouter(routerIntance, itme, optons));
    }
    else {
        ResigerRouter(routerIntance, controllerInstance, optons);
    }
}
exports.ResigerRouters = ResigerRouters;
function ResigerRouter(routerIntance, controllerInstance, optons) {
    if (!routerIntance) {
        throw `Missing parameter routing instance`;
    }
    // console.log("controllerInstance",controllerInstance)
    if (typeof controllerInstance == "function") {
        controllerInstance = Reflect.construct(controllerInstance, []);
    }
    if (typeof controllerInstance == "object" &&
        typeof controllerInstance.constructor != "function") {
        throw `Controller is not class Function,resiger is fail`;
    }
    let { prefix, routers } = (0, Controller_Decorator_1.getControllerMeta)(controllerInstance.constructor);
    const globalMidwares = optons.midwares || [];
    const golbalGuards = optons.guards || [];
    const globalPipes = optons.pipes || [];
    for (let key in routers) {
        if (key == "constructor")
            return;
        //获取中间件
        let middlewares = [
            ...globalMidwares,
            ...((0, Use_Decorator_1.getMiddleware)(controllerInstance, key) || []),
        ];
        // console.log("middlewares",middlewares)
        //获取守卫
        let guards = [
            ...(0, Guard_Decorator_1.GuardTranformsMiddleWare)(controllerInstance, key, ...golbalGuards),
            ...((0, Guard_Decorator_1.getGuard)(controllerInstance, key) || []),
        ];
        // console.log("guards",guards)
        // 获取管道
        let pips = [
            ...(0, Pipe_1.pipTranfromMiddleWare)(controllerInstance, key, ...globalPipes),
        ];
        let routerMeat = routers[key];
        let pathname;
        if (routerMeat.path instanceof RegExp) {
            pathname = routerMeat.path;
        }
        else if (typeof routerMeat.path !== "object") {
            pathname =
                path_1.default
                    .join("/", prefix || "", routerMeat.path || "")
                    .replace(/\\+/g, "/") || "/";
        }
        //方法参数
        let parameterMeta = (0, Parameter_Decorator_1.getMothodParameter)(controllerInstance, key) || [];
        let actionFn = async (ctx, next) => {
            let args = parameterMeta.map((item) => item(ctx, next, controllerInstance, key));
            const resBody = await controllerInstance[key].call(controllerInstance, ...args);
            if (resBody !== undefined)
                ctx.body = await resBody;
            await next();
        };
        let methond = routerMeat.methond;
        routerIntance[methond](pathname, ...middlewares, ...guards, ...pips, actionFn);
    }
}
exports.ResigerRouter = ResigerRouter;
