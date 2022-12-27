import type BaseModel from "@models/base/BaseModel";

interface EpisodeModel extends BaseModel {
    title: string;
    description: string;
    duration: number,
    episode_num: number,
    next_episode: string,
    prev_episode: string,
    season: string,
    thumbnail: string;
}

export default EpisodeModel;
