import { BaseModel } from './base/BaseModel';

interface DataCount {
  actors: number;
  characters: number;
  episodes: number;
  games: number;
  locations: number;
  seasons: number;
  soundtracks: number;
}

export interface OverviewModel extends BaseModel {
  title: string;
  description: string;
  language: string;
  languages: string;
  creators: string;
  data_count: DataCount;
}
