import BaseTranslation from '@models/base/BaseTranslation';

export interface SeasonTranslation extends BaseTranslation {
  title: string;
  description: string;
  genres: string[];
  trailers: string[];
}
