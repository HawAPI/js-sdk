import type BaseModel from '@models/base/BaseModel';

export interface EpisodeModel extends BaseModel {
  title: string;
  description: string;
  language: string;
  duration: number;
  episode_num: number;
  next_episode: string;
  prev_episode: string;
  season: string;
  images: string[];
  languages: string[];
}
