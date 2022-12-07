# Typescript  data type

## 基本类型

`Ts`的数据类型主体有两大部分构成，一部分是继承了`JS`的数据类型，一部分是`TS`独有的数据类型。从类型的角度讲，`TS`是对`JS`
的类型做出了粒度更细的划分，并声明了一些独有的语法让使用者可以声明粒度更细，约束更强的类型。

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
const personRecord: PersonRecord = {name: 'Jack'};
const person: Person = {name: 'Jack'};
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
type FnWithVoid = (name: string, age: number) => void
const getInfo: FnWithVoid = (name) => name;
// function this
type FnWithThis = (this: Person) => void
const getName: FnWithThis = function () {
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
type FnWithVoid = (name: string, age: number) => void
const getInfo: FnWithVoid = (name) => name;
```

函数部分的声明比较特殊，大致有几个点体现.这里TS的编译是可以通过的，从实现对比声明可以得知，对返回值为`void`
类型额度函数声明，即使存在返回值，也不影响编译的结果，因此，TS的类型检查也允许通过，同样，参数缺失作为类型兼容的情况也是允许通过。

### 枚举对象

`TS`的枚举类型支持两大种类：数字类型和字符串类型

#### 数字枚举

```ts
enum color {
    black,
    white,
}

const black = color.black
const blackCode = color[0]
```

数字类型的枚举值都是数字,如果不存在默认值则从零开始递增，枚举对象成员递增只会关注前一个枚举成员的值，有值的话后面依次跟着递增。比较特殊的一点是数字类型的枚举可以相互映射访问，通过值可以访问字面量，通过字面量可以访问值。

##### 权限控制

在了解数字枚举的时候，发掘了不少通过枚举对权限控制做处理的文章，大致通读后，整理了一下逻辑。大体上有几个前置的知识点，都是科班出身比较好理解的。

> 存在一个功能，要根据不同的权限，开启不同的模块，并且本功能可能还要变动一部分权限，即权限是从上级模块流出，又要从流入到下级模块。

由此功能，可以设计一个权限枚举

```typescript
enum Permissions {
    read = 1 << 0,
    write = 1 << 1,
    insert = 1 << 2,
    delete = 1 << 3
}
```

然后假定几个权限用户

```typescript
// 基本用户 读写权限
const userAuth = Permissions.read | Permissions.write
// 管理员 添加删除权限
const manageAuth = Permissions.insert | Permissions.delete
// 超级账户
const admin = manageAuth | userAuth
// 降级超级账户的权限
const root = admin & (~Permissions.insert)
// 检验权限
const checkAuth = (role:number, auth:number) => (role & auth) === auth
// 
console.log(checkAuth(root, Permissions.insert))
```
通过位运算加数字枚举就可以很巧妙地把权限自由拆分或者组合，并且不影响其他的权限。


#### 字符串枚举

```ts
enum color {
    black = 'black',
    white = 'white',
}

type color = 'black' | 'white'

```

字符串类型的枚举是不可以进行访问映射的，并且作为字符串枚举要求每个枚举都必须有值存在.其实字符串枚举如果是用来做取值的限制，用类型限制的效果会比字符串枚举的效果更好.

#### 异构枚举

异构枚举其实就是综合了数字枚举和字符串枚举。这种枚举一般不会使用，官方也不推荐使用。






