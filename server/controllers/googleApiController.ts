import {Request, Response, NextFunction, Express} from "express";
import dotenv from 'dotenv'

dotenv.config();

// export const googleApiController = {};

type googleApiControllerType = {
    call: any
}

function googleApiControllercall = async (req: Request, res: Response, next: NextFunction): Promise<googleApiControllerType> => {
    const query = 'restaurants+in+New+York'
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await fetch (url)
    const data = response.json()
    console.log(data)
    res.locals.events = data
    return next()
};
