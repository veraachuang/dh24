import express, { Express, Request, Response } from "express"
import {sendNotification} from "./main";

// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(express.json());

// post endpoint for sending a device notification
app.post("/api/device-status", sendNotification);
app.listen(port, () => console.log(`Server listening on ${port}`));