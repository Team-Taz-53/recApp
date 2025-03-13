import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from './routers/routers'
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api',router)

//Boilerplate to check if the code is working correctly---------------------------
app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Hello from the backend");
});

//Boilerplate to send a 404 error if page doesn't exit---------------------------
app.use((req: Request, res: Response) => {
  res.status(404).json("This is a 404 error");
});

//Boilerplate to send a 500 error if system error--------------------------------
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "You are receiving an error from the server",
    status: 500,
    message: { err: "This is a 500 error message" },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).send(errorObj.message);
});

//Boilerplate to send a console.log when the server starts--------------------------------
app.listen(PORT, () => {
  console.log(`Now listening on ${PORT}`);
});
