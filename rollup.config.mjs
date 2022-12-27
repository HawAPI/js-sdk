// @ts-check

import { readFile } from 'node:fs/promises';

import { terser } from 'rollup-plugin-terser';
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
 * Website: https://hawapi.theproject.id
 * Docs: https://hawapi.theproject.id/docs
 * Github: https://github.com/HawAPI/js-sdk
 * 
 * (c) ${packageJSON.author.name}
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
      file: './dist/index.js',
      format: 'commonjs',
    }),
    createOutputOptions({
      file: './dist/cjs/index.cjs',
      format: 'commonjs',
    }),
    createOutputOptions({
      file: './dist/esm/index.mjs',
      format: 'esm',
    }),
    createOutputOptions({
      file: './dist/esm/index.esm.js',
      format: 'esm',
    }),
    createOutputOptions({
      file: './dist/umd/index.umd.js',
      format: 'umd',
    }),
    createOutputOptions({
      file: './dist/umd/index.umd.min.js',
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
