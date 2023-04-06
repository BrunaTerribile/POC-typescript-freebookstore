import { Router } from "express";
import bookControllers from "../controllers/bookControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { bookSchemma } from "../schemas/Book.js";

const bookRoutes = Router();

bookRoutes.all("/*", authMiddleware.authValidation)
bookRoutes.post("/", validateSchema(bookSchemma), bookControllers.create);
bookRoutes.get("/", bookControllers.findAll);
bookRoutes.post("/take-book/:id", bookControllers.takeBook);
bookRoutes.get("/my-books", bookControllers.findAllMyBooks);

export default bookRoutes;
