// @ts-nocheck

/*
 * @Author: wangzhisen
 * @Date: 2023-02-28 12:12:52
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-28 14:34:03
 *
 * 对lispAST进行遍历，转化为jsAST
 *
 * Todo: 补充ts类型定义
 */

import type { LispAST } from './typing/lisp';
import { JsVisitors } from './typing/js';

export const traverse = (ast: LispAST, visitors: JsVisitors) => {
  const walkNodes = (nodes: LispAST[], parent: any) => {
    nodes.forEach((node) => walkNode(node, parent));
  };
  const walkNode = (node: LispAST, parent: any) => {
    const method = visitors[node.type];
    if (method) {
      method(node, parent);
    }
    if (node.type === 'Program') {
      walkNodes(node.body, node);
    } else if (node.type === 'CallExpression') {
      walkNodes(node.params, node);
    }
  };

  walkNode(ast, null);
};
