import { Document ,Types } from 'mongoose';
import ITrack from './track.interface';

export default interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    role: string;
    photoUrl: string;
    language: string,
    isValidPassword(password: string): Promise<Error | boolean>;
}