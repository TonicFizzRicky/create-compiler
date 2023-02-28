# create-compiler

根据 《Create your own compiler》实现的编译器

https://citw.dev/tutorial/create-your-own-compiler

---

## 目标

简单实现一个编译器 `compiler` 函数，实现把 `Lisp` 语法 转化为 `JavaScript` 语法

```
示例:
(add 2 (sub 4 3)) // Lisp

add(2,sub(4,3)) // JavaScript

```
---

## 前置

了解 `AST` 

https://zhaomenghuan.js.org/blog/js-ast-principle-reveals.html#%E5%89%8D%E8%A8%80

---

## 使用

### 环境搭建

`NodeJS` 以及 npm包管理器，如 `npm`/`yarn`/`pnpm`

### 克隆代码

```
https://github.com/TonicFizzRicky/create-compiler.git
```

### 项目开发

```
# 安装依赖
pnpm i

# 开发打包代码(ts -> js)
pnpm dev

# 运行代码
pnpm start
```

---

## 概念

### Lexical Analysis 词法分析

代码:`src/tokenizer.ts`

将代码字符串逐字进行拆解，分析词法

生成一个对象数组  `token`

对象数组的 `type` 约定如下

```
paren: 符号(如:括号)
name: 变量或者函数的名称
number: 数字
```


词法分析生成 `token`:

```javascript
[
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'paren', value: '(' },
  { type: 'name', value: 'sub' },
  { type: 'number', value: '4' },
  { type: 'number', value: '3' },
  { type: 'paren', value: ')' },
  { type: 'paren', value: ')' }
]

```

### Syntactic Analysis 语法分析

代码:`src/parser.ts`

上一步生成的 `token` 需要进行语法分析，主要通过 `type` 进行转化

转化为一个树状结构的 `lisp AST` (lisp 语言的抽象语法树)

通过树状结构我们可以知道函数调用的参数以及类型,相较于 `token` 更具语义化

`CallExpression` 表示这个类型为函数表达式,`CallExpression` 使用 `name` 存储函数的名称

`NumberLiteral` 表示这个类型为数字类型，使用 `value` 存储值

```javascript

// (add 2 (sub 4 3))
// add 函数被调用，参数为 2 以及 sub(4,3)
// sub 函数被调用 参数为 4,3

 {
  "type": "Program",
  "body": [
    {
      "type": "CallExpression",
      "name": "add",
      "params": [
        {
          "type": "NumberLiteral",
          "value": "2"
        },
        {
          "type": "CallExpression",
          "name": "sub",
          "params": [
            {
              "type": "NumberLiteral",
              "value": "4"
            },
            {
              "type": "NumberLiteral",
              "value": "3"
            }
          ]
        }
      ]
    }
  ]
}

```

### Transformation 编码转换

代码:`src/transformer.ts`

上一步得到的 `lisp AST`,转化为 `js AST`

可以参考: https://astexplorer.net/

其实不生成 `js AST` 也能直接通过 `lisp AST` 去转化 js代码

至于为什么需要经过 `Transformation` 这一步处理，还需要再梳理一下逻辑


```
 {
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "add"
        },
        "arguments": [
          {
            "type": "NumericLiteral",
            "value": "2"
          },
          {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "name": "sub"
            },
            "arguments": [
              {
                "type": "NumericLiteral",
                "value": "4"
              },
              {
                "type": "NumericLiteral",
                "value": "3"
              }
            ]
          }
        ]
      }
    }
  ]
}
```

### Code Generation 代码生成

代码:`src/generateCode.ts`


根据 `js AST` 生成 js code

---
## Todo

- [ ] 补充类型声明 