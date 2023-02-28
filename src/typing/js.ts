import type { LispNumberLiteralType, ListCallExpressionType } from './lisp';

// jsAST类型

export interface JsExpressionStatementType {
  type: 'ExpressionStatement';
  expression: string;
}

export interface JSCallExpressionType {
  type: 'CallExpression';
  callee: {
    type: 'Identifier';
    name: string;
  };
  arguments: JsExpressionStatementType[];
}

export interface JsNumericLiteralType {
  type: 'NumericLiteral';
  value: string;
}

export type JsASTBodyItemType = JsNumericLiteralType | JSCallExpressionType;

export interface JsAST {
  type: string;
  body: JsASTBodyItemType[];
}

export interface JsVisitors {
  NumberLiteral: (node: LispNumberLiteralType) => void;
  CallExpression: (node: ListCallExpressionType, parent: any) => void;
}
