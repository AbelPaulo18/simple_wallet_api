import express from "express";
import cors from "cors";
import createError from "http-errors";

import { mainRouter } from "./routes/index.js";
import morgan from "morgan";

const server = express();
const Port = 5000;

server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());
server.use(morgan("dev"));
server.use(mainRouter);

server.get("/", (request, response) => {
  response.status(200).send({ message: "Hello World from the server!" });
});

server.use(async (req, res, next) => {
  next(createError.NotFound("Link Not Found!"));
});

server.use((err, req, res, next) => {
  res.status(err.status || 500); //If the error status is not defined return internal server error...
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

server.listen(Port, () => console.log("Server Running..."));
