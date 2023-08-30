/**
 * The filter format for all queries
 *
 * **Note: Use ',' to define filter as array. E.g: 'tag1,tag2,tag3'** \
 * See more: {@link https://hawapi.theproject.id/docs/guides/filters}
 */
export type Filters = {
  [key: string]: string | undefined | null;
};
