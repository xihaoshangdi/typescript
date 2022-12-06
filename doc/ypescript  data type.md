# Typescript  data type

## 基本类型

`Ts`的数据类型主体有两大部分构成，一部分是继承了`JS`的数据类型，一部分是`TS`独有的数据类型。从类型的角度讲，`TS`是对`JS`的类型做出了粒度更细的划分，并声明了一些独有的语法让使用者可以声明粒度更细，约束更强的类型。

以下给出大部分的类型声明，部分类型声明后续会进行详细补充，像是函数的声明和编译检测就比较复杂，有时候松散，有时候严格。

```typescript
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
```

### 函数的声明

```typescript
type FnWithVoid=(name:string,age:number)=> void
const getInfo:FnWithVoid = (name) => name;
```
函数部分的声明比较特殊，大致有几个点体现.这里TS的编译是可以通过的，从实现对比声明可以得知，对返回值为`void`类型额度函数声明，即使存在返回值，也不影响编译的结果，因此，TS的类型检查也允许通过，同样，参数缺失作为类型兼容的情况也是允许通过。
