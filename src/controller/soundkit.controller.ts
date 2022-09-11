import { NextFunction, Request, Response, Router } from "express";
import IController from "@/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from '@/utils/validation/soundkit.validation'
import SoundkitService from '@/service/soundkit.service';
import authenticated from '@/middleware/authenticated.middleware';
import roleMiddleware from "@/middleware/role.middleware";

class SoundkitController implements IController {
    public path = '/soundkit';
    public router = Router();
    private SoundkitService = new SoundkitService();

    constructor(){
        this.initialiseRoutes();

        /**
         * Authentication Guard
         */
        
        this.router.use(authenticated)
    }

    private initialiseRoutes(): void {

        /**
         * Create new Soundkit
        */

        this.router.post(`${this.path}`,[roleMiddleware,validationMiddleware(validate.create)],this.create)

        /**
         * Update soundkit
         */
    }

    private create = async (req:Request,res:Response,next: NextFunction): Promise<Response | void> => {
        try {
            const { title, description, thumbnailUrl, url, userId} = req.body
            const soundkit = await this.SoundkitService.create(title, description, thumbnailUrl, url, userId)
            res.status(201).json({soundkit})
        } catch (error:any) {
            next(new HttpException(400, 'Cannot create soundkit'))
        }
    }
}

export default SoundkitController