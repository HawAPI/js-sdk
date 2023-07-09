import type BaseModel from '@models/base/BaseModel';

export interface SoundtrackModel extends BaseModel {
  name: string;
  duration: number;
  artist: string;
  album: string;
  release_date: string;
  urls: string[];
}
