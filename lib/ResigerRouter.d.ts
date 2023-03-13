import { Pipe } from "./Pipe";
type IResigerRouterOption = {
    midwares?: Array<Function>;
    guards?: Array<Function>;
    pipes?: Array<Pipe>;
};
export declare function ResigerRouters(routerIntance: any, controllerInstance: Object | Function | Array<Object | Function>, optons?: IResigerRouterOption): void;
export declare function ResigerRouter(routerIntance: any, controllerInstance: Object | Function, optons?: IResigerRouterOption): void;
export {};
