
declare module 'get-deep' {
    /*~ This example shows how to have multiple overloads for your function */
    function getDeep (object: any, ...args: any[]): any;

    export = getDeep;
}