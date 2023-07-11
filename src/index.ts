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
 * Website: https://hawapi.theproject.id \
 * Docs: https://hawapi.theproject.id/docs \
 * Github: https://github.com/HawAPI/js-sdk
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
 * See more samples: https://github.com/HawAPI/js-sdk/tree/main/samples
 *
 * @param options Endpoint, version, token, etc.. configurations
 * @returns A new HawAPI Client
 */
export const createClient = (options?: HawAPIOptions) => {
  return new HawAPIClient(options);
};
