import { BaseModel } from './base/BaseModel';

export interface LocationModel extends BaseModel {
  name: string;
  description: string;
  language: string;
  images: string[];
  languages: string[];
}
