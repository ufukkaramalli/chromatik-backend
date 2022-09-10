import 'dotenv/config';
import 'module-alias/register';
import App from './app'
import validateEnv from '@/utils/validateEnv';
import TrackController from '@/controller/track.controller';
import UserController from '@/controller/user.controller'
import SoundkitController from '@/controller/soundkit.controller';

validateEnv();

const app = new App([new TrackController(), new UserController(), new SoundkitController()], Number(process.env.PORT));

app.listen();