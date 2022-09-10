import SoundkitModel from "@/model/soundkit.model";
import ISoundkit from "@/interfaces/soundkit.interface";
import { Types } from "mongoose";

class SoundkitService {
    private soundkit = SoundkitModel

    /**
     * Create a new Soundkit
     */

    public async create(title:string, description:string, thumbnailUrl:string, url:string, userId:Types.ObjectId): Promise<ISoundkit> {
        try {
            const soundkit = await this.soundkit.create({title, description, thumbnailUrl, url, userId})
            return soundkit
        } catch (error) {
            throw new Error('Unable to create soundkit')
        }
    }
}

export default SoundkitService