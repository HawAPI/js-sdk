export interface RequestResult<T> {
  page?: number | null;
  page_size?: number | null;
  page_total?: number | null;
  item_size?: number | null;
  next_page?: number | null;
  prev_page?: number | null;
  language?: string | null;
  status?: number | null;
  data?: T;
}
