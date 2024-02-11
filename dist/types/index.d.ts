declare function _exports(command: any, args: any, options: any, callback: any): void;
declare namespace _exports {
    let spawn: (command: any, args: any, options: any, callback: any) => void;
    let sync: (command: any, args: any, options: any) => any;
}
export = _exports;
