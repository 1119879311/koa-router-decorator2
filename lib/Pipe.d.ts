import { IContextOption } from "./Util";
export declare abstract class Pipe {
    abstract apply(option: IContextOption): Promise<void> | void;
}
export declare function pipTranfromMiddleWare(instance: Object, methodName?: string, ...middlewares: Array<Pipe>): Array<Function>;
