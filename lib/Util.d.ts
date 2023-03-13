export declare function isNotBaseType(name: string): boolean;
export type IContextOption = {
    get: <T>(metaKey: string | symbol, isClass?: boolean) => T | undefined;
    getArgs: () => Array<any> | undefined;
    ctx: any;
    next?: Function;
};
export declare function getContext<T = any>(instance: object, methodName?: string, metaKey?: string | symbol, isClass?: boolean): T;
export declare function getArgs(ctx: Function, next: Function, instance: object, methodName?: string): Array<any>;
export declare function getContextOption(ctx: any, next: Function, instance: Object, methodName?: string): IContextOption;
