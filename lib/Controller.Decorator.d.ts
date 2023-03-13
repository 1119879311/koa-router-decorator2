import "reflect-metadata";
import { IControllerMetate } from "./Interface";
export declare function getControllerMeta(target: any): IControllerMetate;
export declare function Controller(prefix?: string): (target: any) => void;
