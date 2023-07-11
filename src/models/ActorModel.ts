import { ActorSocialModel } from './ActorSocialModel';
import { BaseModel } from './base/BaseModel';

export interface ActorModel extends BaseModel {
  first_name: string;
  last_name: string;
  nicknames: string[];
  birth_date: string;
  death_date: string;
  gender: number;
  nationality: string;
  seasons: string[];
  awards?: string[];
  character: string;
  socials?: ActorSocialModel[];
  images: string[];
}
