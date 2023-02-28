/*
 * @Author: wangzhisen
 * @Date: 2023-02-28 10:53:12
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-28 12:49:34
 *
 * 进行词法分析，循环去处理对应的字符，判断是属于什么类型
 */

import type { Token } from './typing/token';

const LETTERS = /[a-z]/i; // 匹配字母，获取函数名称
const WHITESPACE = /\s/; // 匹配空白符号
const NUMBERS = /\d/; // 匹配数字

export const tokenizer = (input: string) => {
  const tokens: Token[] = [];
  let current = 0;

  while (current < input.length) {
    let char = input[current];

    // 处理符号
    if (char === '(' || char === ')') {
      tokens.push({
        type: 'paren',
        value: char,
      });
      current++;
      continue;
    }

    // 处理字母，则获取完整的字母作为函数名
    else if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: 'name',
        value,
      });
      continue;
    }

    // 处理空白符号，AST不必更新
    else if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 处理数字，获取完整数字
    else if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({
        type: 'number',
        value,
      });
      continue;
    }

    // 无法分析的字符串，抛出异常
    else {
      throw TypeError(`Unknown char,${char}`);
    }
  }

  return tokens;
};
