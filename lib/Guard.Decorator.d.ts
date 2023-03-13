import { IContextOption } from "./Util";
export declare function Guard(...middlewares: Array<Function>): Function;
export declare function getGuard(instance: Object, methodName?: string): Function[];
export type IGuard = (option: IContextOption) => boolean | Promise<boolean>;
export type IGuardParams = Parameters<IGuard>[0];
export declare function GuardTranformsMiddleWare(instance: Object, methodName?: string, ...middlewares: Array<Function>): Array<Function>;
