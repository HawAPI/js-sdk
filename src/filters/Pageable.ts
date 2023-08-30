import { OrderType } from '../enums';

/**
 * The HawAPI page options.
 */
export class Pageable {
  /**
   * The request page
   *
   * @default 0
   */
  page?: number;

  /**
   * The size of items inside each page
   *
   * @default 10
   */
  size?: number;

  /**
   * The sort of items inside each page
   */
  sort?: string;

  /**
   * The order of items inside each page
   *
   * **Note: Order will only be applied if {@link size} is defined**
   *
   * Options:
   *  - Ascending (ASC)
   *  - Descending (DESC)
   *
   * @default 'asc'
   */
  order?: OrderType;

  constructor(pageable: Partial<Pageable>) {
    this.page = 0;
    this.size = 10;
    this.order = 'asc';

    if (pageable.page) this.page = pageable.page;

    if (pageable.size) this.size = pageable.size;

    if (pageable.sort) this.sort = pageable.sort;

    if (pageable.order) this.order = pageable.order;
  }
}
