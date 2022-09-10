import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/utils/validation/track.validation';
import TrackService from '@/service/track.service';
import authenticated from '@/middleware/authenticated.middleware';

class TrackController implements IController {
    public path = '/track';
    public router = Router();
    private TrackService = new TrackService();

    constructor(){
        this.initialiseRoutes()
        
        /**
         * Authentication Guard
         */
        this.router.use(authenticated)
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    private create = async (
        req:Request,
        res:Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, description, art, status, url, userId } = req.body;
            const track = await this.TrackService.create(name, description, art, status, url, userId)
            res.status(201).json({ track });
        } catch (error:any) {
            next(new HttpException(400, 'Cannot create post'))
        }
    }
}

export default TrackController