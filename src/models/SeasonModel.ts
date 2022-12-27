import type BaseModel from "@models/base/BaseModel";

interface SeasonModel extends BaseModel {
    title: string;
    description: string;
    duration_total: number,
    genres: number,
    season_num: number,
    release_date: string,
    next_season: string,
    prev_season: string,
    episodes: string[],
    soundtracks: string[],
    trailers: string[],
    budget: number,
    thumbnail: string;
    images: string[],
}

export default SeasonModel;
