import HawAPIClient from './HawAPIClient';
import HawAPIOptions from './HawAPIOptions';

export { HawAPIClient, HawAPIOptions };

export * from './enums';
export * from './exceptions';
export * from './filters';
export * from './models';

/**
 * Creates a new HawAPI client.
 *
 * - [Github](https://github.com/HawAPI/js-sdk/)
 * - [TypeDoc](https://hawapi.github.io/js-sdk/v1/)
 * - [Examples (Github)](https://github.com/HawAPI/js-sdk/examples/)
 *
 * @example
 * - Javascript (UMD)
 * ```js
 *  const client = HawAPI.createClient()
 *  // Also valid:
 *  // const { createClient } = HawAPI
 *  // const client = createClient()
 *
 *  console.log('HawAPI client: ', client)
 * ```
 *
 * @example
 * - Javascript (ESM)
 * ```js
 *  import { createClient } from '<REF>'
 *  const client = createClient()
 *
 *  console.log('HawAPI client: ', client)
 * ```
 *
 * See more samples: https://github.com/HawAPI/js-sdk/tree/main/examples
 *
 * @param options Endpoint, version, token, etc.. configurations
 * @returns A new HawAPI Client
 */
export const createClient = (options?: Partial<HawAPIOptions>) => {
  return new HawAPIClient(options);
};
