import type BaseModel from "@models/base/BaseModel";

interface GameModel extends BaseModel {
    name: string;
    platforms: string[];
    genres: string[];
    publishers: string[];
    developers: string[];
    url: string,
    trailer: string,
    thumbnail: string;
}

export default GameModel;