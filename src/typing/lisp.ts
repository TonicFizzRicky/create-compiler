// listAST类型

export interface ListCallExpressionType {
  type: 'CallExpression';
  name: string;
  params: LispASTBodyItemType[];
}

export interface LispNumberLiteralType {
  type: 'NumberLiteral';
  value: string;
}

export type LispASTBodyItemType = LispNumberLiteralType | ListCallExpressionType;

export interface LispAST {
  type: string;
  body: LispASTBodyItemType[];
}
