import type BaseModel from "@models/base/BaseModel";

interface SoundtrackModel extends BaseModel {
    name: string;
    duration: number;
    artist: string;
    album: string;
    release_data: string;
    urls: string[],
    thumbnail: string;
}

export default SoundtrackModel;
