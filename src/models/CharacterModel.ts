import type BaseModel from '@models/base/BaseModel';

export interface CharacterModel extends BaseModel {
  first_name: string;
  last_name: string;
  nicknames: string[];
  birth_date: string;
  death_date: string;
  gender: number;
  actor: string;
  images: string[];
}
