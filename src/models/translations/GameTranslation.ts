import BaseTranslation from '@models/base/BaseTranslation';

export interface GameTranslation extends BaseTranslation {
  title: string;
  description: string;
  trailer: string;
}
