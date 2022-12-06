// typescript

// boolean
const withBoolean: boolean = false;
// number
const withNumber: number = 100;
// string
const withString: string = 'test typescript type';
const withTempString: string = `Temp ${withString}`;
// symbol
const withSymbol: symbol = Symbol('test Symbol');
// bigint
const withBigInt: bigint = 100n;
// null | undefined
const withNull: null = null;
const withUndefined: undefined = undefined;
// Array
const withNumberArray: number[] = [1, 2, 3];
const withNumberT: Array<number> = [1, 2, 3];
// Tuple 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
const withTuple: [number, string] = [1, '1'];
// index signature [<index_name>: <index_type>]: <element_type>
// index_type must be 'string', 'number', 'symbol'
type Person = { [index: string]: string };
type PersonRecord = Record<string, string>;
const personRecord: PersonRecord = { name: 'Jack' };
const person: Person = { name: 'Jack' };
// never
type operate = string | number;
const withOperate: operate = 1;
if (typeof withOperate === 'string') {
    console.log(withOperate);
} else if (typeof withOperate === 'number') {
    console.log(withOperate);
} else {
    console.log(withOperate);
}
// unkown
const withUnknown: unknown = 100;
const asNumber = withUnknown as Number;
// function 松散的函数类型检查  https:segmentfault.com/q/1010000022183199
type FnWithVoid=(name:string,age:number)=> void
const getInfo:FnWithVoid = (name) => name;
// function this
type FnWithThis=(this:Person)=> void
const getName:FnWithThis = function () {
    return this.name;
};

//
console.log(
    withBoolean,
    withNumber,
    withString,
    withTempString,
    withSymbol,
    withBigInt,
    withNumberArray,
    withNumberT,
    withTuple,
    withNull,
    withUndefined,
    withUnknown,
    asNumber,
    person,
    personRecord,
    getName.call(person)
);

export {};
