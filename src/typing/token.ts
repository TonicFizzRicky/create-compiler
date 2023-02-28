export type TokenType = 'paren' | 'name' | 'number';

export interface Token {
  type: TokenType;
  value: string;
}
