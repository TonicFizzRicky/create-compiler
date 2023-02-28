/*
 * @Author: wangzhisen
 * @Date: 2023-02-28 11:26:51
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-28 12:50:25
 *
 * 将词法分析的结果(tokens) 转化为lisp语法的抽象语法树(lispAST)
 */
import { Token } from './typing/token';
import { LispAST, ListCallExpressionType, LispASTBodyItemType } from './typing/lisp';

export const parser = (tokens: Token[]): LispAST => {
  let current = 0;

  const walk = (): LispASTBodyItemType => {
    let token = tokens[current];
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    } else if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current];
      const expression: ListCallExpressionType = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };
      token = tokens[++current];
      while (token.value !== ')') {
        expression.params.push(walk());
        token = tokens[current];
      }
      current++;
      return expression;
    } else {
      throw new TypeError(`Unknown token:${token}`);
    }
  };
  const ast = {
    type: 'Program',
    body: [walk()],
  } as unknown as LispAST;

  return ast;
};
