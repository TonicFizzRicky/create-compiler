/*
 * @Author: wangzhisen
 * @Date: 2023-02-28 12:11:35
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-28 14:34:11
 *
 * 对lispAST进行转化,转化为js的ast
 */
import { traverse } from './traverse';
import type { LispAST } from './typing/lisp';
import type { JsAST } from './typing/js';

export const transformer = (lispAST: LispAST): JsAST => {
  const jsAST: JsAST = {
    type: 'Program',
    body: [],
  };

  let position = jsAST.body;

  traverse(lispAST, {
    NumberLiteral(node) {
      position.push({
        type: 'NumericLiteral',
        value: node.value,
      });
    },
    CallExpression(node, parent) {
      let expression: any = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.name,
        },
        arguments: [],
      };
      const prevPosition = position;
      position = expression.arguments;
      if (parent.type !== 'CallExpression') {
        expression = {
          type: 'ExpressionStatement',
          expression,
        };
      }
      prevPosition.push(expression);
    },
  });

  return jsAST;
};
