import express from "express";
import "express-async-errors";
import path from "path";
import cors from "cors";

import {NotFoundError} from "./errors/not-found-error";
import {errorHandler} from "./middlewares/error-handler";
import routes from "./routes";

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};
