import { BaseModel } from './base/BaseModel';

export interface GameModel extends BaseModel {
  name: string;
  description: string;
  language: string;
  playtime: number;
  age_rating: string;
  platforms: string[];
  stores: string[];
  modes: string[];
  genres: string[];
  publishers: string[];
  developers: string[];
  release_date: string;
  website: string;
  tags: string[];
  languages: string[];
  trailer: string;
  images: string[];
}
