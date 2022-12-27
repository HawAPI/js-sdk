import type BaseModel from "@models/base/BaseModel";

interface CharacterModel extends BaseModel {
  first_name: string;
  last_name: string;
  nicknames: string[];
  birth_date: string;
  death_date: string;
  gender: number;
  actor: string;
  thumbnail: string;
  images: string[];
}

export default CharacterModel;
