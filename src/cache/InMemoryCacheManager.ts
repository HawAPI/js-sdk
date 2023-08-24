import { RequestResult } from '../models';

/**
 * In memory cache manager
 */
export class InMemoryCacheManager {
  private storage = new Map<string, RequestResult<unknown>>();
  private useCache: boolean;

  constructor(useCache: boolean) {
    this.useCache = useCache;
  }

  /**
   * Method to get all keys of cached data
   * @returns All cached keys
   */
  async keys(): Promise<IterableIterator<string>> {
    return this.storage.keys();
  }

  /**
   * Method to clear all cached data
   * @returns The count of all cleaned data
   */
  async clear(): Promise<number> {
    const count = this.storage.size;
    this.storage.clear();
    return count;
  }

  /**
   * Method to create/set a new cache data
   *
   * **Note: If {@link useCache} is false, no data will be cached** \
   * **Note: If an element with the same key already exists, the element will be updated.**
   *
   * @param key The cache key
   * @param value The value to be cached
   */
  async set(key: string, value: RequestResult<unknown>): Promise<void> {
    if (this.useCache) {
      this.storage.set(key, value);
    }
  }

  /**
   * Method to get specific data from key
   * @param key The cache key
   * @returns The {@link RequestResult} value, or undefined if no data is found
   */
  async get<T>(key: string): Promise<RequestResult<T> | undefined> {
    return this.storage.get(key) as RequestResult<T> | undefined;
  }

  /**
   * Method to remove specific cache data
   * @param key The cache key
   * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
   */
  async remove(key: string): Promise<boolean> {
    return this.storage.delete(key);
  }

  /**
   * Method to remove a list of cache data
   * @param keys The cache keys
   * @returns The count of all removed data
   */
  async removeAllIn(keys: string[]): Promise<number> {
    let count = 0;

    keys.forEach((key) => {
      if (this.storage.delete(key)) {
        count = count + 1;
      }
    });

    return count;
  }

  /**
   * Method to get the size of cached data
   * @returns The count of all cached data
   */
  async size(): Promise<number> {
    return this.storage.size;
  }
}
