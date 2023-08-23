import { BaseModel } from './base/BaseModel';

export interface OverviewModel extends BaseModel {
  title: string;
  description: string;
  language: string;
  languages: string;
  creators: string;
}
