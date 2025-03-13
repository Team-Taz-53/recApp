import express, { Request, Response } from "express";
// import { userController } from '../controllers/userController';
// import { pollController } from '../controllers/pollController';
import { googleApiController } from "../controllers/googleApiController.js";

export const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
//   return res.status(200).send("This is the working login button");
})

router.get('/getevents', googleApiController.call, (req: Request, res: Response) => {
//   return res.status(200).send(res.locals.events);
})


