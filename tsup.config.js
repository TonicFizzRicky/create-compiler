import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'], // 打包的入口文件
    splitting: false, // 是否代码分割
    format: 'cjs', // 打包格式,默认cjs 'cjs' | 'esm' | 'iife'
    clean: true, // 打包前是否清除上次dist的产物
    dts: true, // 是否生成d.ts 声明文件
    sourcemap: true, // 是否使用sourceMap
    minify: !options.watch, // 开发环境(pnpm dev)不压缩代码
  };
});
