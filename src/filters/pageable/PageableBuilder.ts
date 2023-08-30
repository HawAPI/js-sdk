import { OrderType } from '../../enums';
import { Pageable } from './Pageable';

/**
 * A fluent builder for configuring Pageable
 */
export class PageableBuilder {
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
}
