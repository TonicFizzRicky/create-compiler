import { compiler } from './compiler';

// Lisp 代码
const input = `(add 2 (sub 4 3))`;

// Js 代码  add(2, sub(4, 3));
const output = compiler(input);

// 输出
console.log('output', output);
