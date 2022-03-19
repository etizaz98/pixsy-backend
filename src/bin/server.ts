import express = require("express");
import cors = require("cors");
import * as helmet from "helmet";
import { json } from "body-parser";
import { Server } from "http";

import { log } from "../log";
import { pixsyRouter } from '../routes';
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Server initialization and middlewares
 */
/////////////////////////////////////////////////////////////////////////////////////////////////
export const app: express.Express = express();
app.locals.baseUri = process.env.BASE_URI || "/api/v1";

app.use((_req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, application/json");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});


app.use(helmet());
app.use(cors());
app.use(json());


app.get(`${app.locals.baseUri}/ping`, (_req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});
// @ts-ignore
app.use(`${app.locals.baseUri}/tests`, express.static("docs/tests/", { extensions: ["html"], index: "index.html" }));

app.use(`${app.locals.baseUri}/pixsy`, pixsyRouter);


/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Error handling and logging
 */
/////////////////////////////////////////////////////////////////////////////////////////////////
const errorHandler: express.ErrorRequestHandler = (_error: any, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
 
   res.sendStatus(500);

};

app.use(errorHandler);

/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Launch server
 */
/////////////////////////////////////////////////////////////////////////////////////////////////
export const SERVER_PORT = parseInt(process.env.PORT || "3008");
export const server: Server = app.listen(SERVER_PORT, "", async () => {
  log.debug("Server is running on port ", SERVER_PORT);
});
server.on("error", (err: Error) => {
  log.error(err);
});