import HawAPIClient from 'HawAPIClient';
import HawAPIOptions from 'HawAPIOptions';

export { HawAPIOptions };

/**
 * Creates a new HawAPI client.
 *
 * Website: https://hawapi.theproject.id \
 * Docs: https://hawapi.theproject.id/docs \
 * Github: https://github.com/HawAPI/js-sdk
 *
 * Examples
 *
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
 * - Javascript (ESM)
 * ```js
 *  import { createClient } from '<REF>'
 *  const client = createClient()
 *
 *  console.log('HawAPI client: ', client)
 * ```
 *
 * @param options Endpoint, version, token, etc.. configurations
 * @returns A new HawAPI Client
 */
export const createClient = (options?: HawAPIOptions) => {
  return new HawAPIClient(options);
};
