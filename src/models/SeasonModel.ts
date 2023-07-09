import type BaseModel from '@models/base/BaseModel';

export interface SeasonModel extends BaseModel {
  title: string;
  description: string;
  language: string;
  duration_total: number;
  genres: string[];
  season_num: number;
  release_date: string;
  next_season: string;
  prev_season: string;
  episodes: string[];
  soundtracks: string[];
  trailers: string[];
  budget: number;
  images: string[];
  languages: string[];
}
