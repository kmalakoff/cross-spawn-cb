export const __esModule: boolean;
export default crossSpawn.exports;
export namespace _enoent {
    export { hookChildProcess };
    export { verifyENOENT };
    export { verifyENOENTSync };
    export { notFoundError };
}
export function _parse(command: any, args: any, options: any): any;
declare function exports(command: any, args: any, options: any): any;
declare namespace crossSpawn { }
declare function spawn_1(command: any, args: any, options: any): any;
export function sync(command: any, args: any, options: any): any;
declare function hookChildProcess(cp: any, parsed: any): void;
declare function verifyENOENT(status: any, parsed: any): Error & {
    code: string;
    errno: string;
    syscall: string;
    path: any;
    spawnargs: any;
};
declare function verifyENOENTSync(status: any, parsed: any): Error & {
    code: string;
    errno: string;
    syscall: string;
    path: any;
    spawnargs: any;
};
declare function notFoundError(original: any, syscall: any): Error & {
    code: string;
    errno: string;
    syscall: string;
    path: any;
    spawnargs: any;
};
export { spawn_1 as spawn };
