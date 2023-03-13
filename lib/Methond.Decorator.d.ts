import "reflect-metadata";
export declare function RequestFactory(methond: string): (path?: string) => (target: any, methodName: string, dec: PropertyDescriptor) => void;
export declare const GET: (path?: string) => (target: any, methodName: string, dec: PropertyDescriptor) => void;
export declare const POST: (path?: string) => (target: any, methodName: string, dec: PropertyDescriptor) => void;
export declare const PUT: (path?: string) => (target: any, methodName: string, dec: PropertyDescriptor) => void;
export declare const DELETE: (path?: string) => (target: any, methodName: string, dec: PropertyDescriptor) => void;
export declare const ALL: (path?: string) => (target: any, methodName: string, dec: PropertyDescriptor) => void;
