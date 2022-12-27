import type BaseModel from "@models/base/BaseModel";

interface LocationModel extends BaseModel {
    name: string;
    description: string;
    thumbnail: string;
    images: string[],
}

export default LocationModel;
