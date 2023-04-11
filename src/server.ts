import express, { json } from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { handleApplicationErrors } from "./middlewares/errorMiddleware.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use(routes);
server.use(handleApplicationErrors);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running in port: ${port}`));
