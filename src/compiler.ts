/*
 * @Author: wangzhisen
 * @Date: 2023-02-28 10:44:41
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-02-28 14:36:06
 *
 * 实现编译
 * 将Lisp代码转化为JavaScript代码
 * 步骤:
 * 1.Lexical Analysis 词法分析
 * 2.Syntactic Analysis 语法分析
 * 3.Transformation 代码转换
 * 4.Code Generation 代码生成
 */
import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { transformer } from './transformer';
import { generateCode } from './generateCode';

export const compiler = (input: string) => {
  // 进行词法分析
  const tokens = tokenizer(input);

  console.log('tokens', tokens);

  // 进行语法分析
  const lispAST = parser(tokens);

  console.log('lispAST', JSON.stringify(lispAST, null, 2));

  // 进行代码转化
  const jsAST = transformer(lispAST);

  console.log('jsAST', JSON.stringify(jsAST, null, 2));

  // 生成js代码
  const jsCode = generateCode(jsAST);

  return jsCode;
};
