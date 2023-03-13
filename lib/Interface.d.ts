export type IMethondType = "get" | "post" | "delete" | "put" | "all";
export type IRouterType = {
    path: string | RegExp;
    methond: string | IMethondType;
};
export type IKeyMapRouters = {
    [methondName: string]: IRouterType;
};
export type IControllerMetate = {
    prefix: string | undefined;
    routers: IKeyMapRouters;
};
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
