// @ts-nocheck

/*
 * @Author: wangzhisen
 * @Date: 2023-02-28 12:21:42
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-28 12:24:40
 *
 * 通过jsAST生成代码
 */
import type { JsAST } from './typing/js';

export const generateCode = (node: JsAST) => {
  if (node.type === 'NumericLiteral') {
    return node.value;
  }
  if (node.type === 'Identifier') {
    return node.name;
  }
  if (node.type === 'CallExpression') {
    // name(arg1, arg2, arg3)
    return `${generateCode(node.callee)}(${node.arguments.map(generateCode).join(', ')})`;
  }
  if (node.type === 'ExpressionStatement') {
    return `${generateCode(node.expression)};`;
  }
  if (node.type === 'Program') {
    return node.body.map(generateCode).join('\n');
  }
};
