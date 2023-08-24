// @ts-check

import { readFile } from 'node:fs/promises';

import terser from '@rollup/plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';

const packageJSON = JSON.parse(await readFile('./package.json', 'utf-8'));

const today = Date().split(' ').splice(1, 3).join(' ');

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * v${packageJSON.version}
 * ${packageJSON.name} (${today})
 * 
 * Website: https://hawapi.theproject.id/
 * API Docs: https://hawapi.theproject.id/docs/
 * Github (SDK): https://github.com/HawAPI/js-sdk
 * TypeDoc: https://hawapi.github.io/js-sdk/v1/
 * 
 * (c) ${packageJSON.author.name} (@${packageJSON.author.username}) - ${packageJSON.author.url}
 * Released under the ${packageJSON.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    name: 'HawAPI',
    exports: 'named',
    sourcemap: true,
    ...options,
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/index.ts',
  output: [
    createOutputOptions({
      file: './dist/index.min.js',
      format: 'commonjs',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.min.cjs',
      format: 'commonjs',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.min.mjs',
      format: 'esm',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.esm.min.js',
      format: 'esm',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.umd.min.js',
      format: 'umd',
      plugins: [terser()],
    }),
  ],
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
    }),
  ],
};

export default options;
