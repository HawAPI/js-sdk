import type { ActorSocialModel } from '@models/ActorSocialModel';
import type BaseModel from '@models/base/BaseModel';

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
