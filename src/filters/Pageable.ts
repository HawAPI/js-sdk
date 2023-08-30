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

  /**
   * A fluent builder for configuring Pageable
   */
  static Builder = class PageableBuilder {
    private pageable: Pageable = new Pageable({});

    page(value: number) {
      this.pageable.page = value;
      return this;
    }

    size(value: number) {
      this.pageable.size = value;
      return this;
    }

    order(value: OrderType) {
      this.pageable.order = value;
      return this;
    }

    sort(value: string) {
      this.pageable.sort = value;
      return this;
    }

    /**
     * Converts the pageable builder into {@link Pageable}
     * @returns A new {@link Pageable}
     */
    build(): Pageable {
      return new Pageable(this.pageable);
    }
  };
}
