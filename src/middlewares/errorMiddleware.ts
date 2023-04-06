import { HttpStatus } from "http-status-ts";
import { Request, Response, NextFunction } from "express";

type Erro = {
  name: string,
  message: string,
  email: string
}

export function handleApplicationErrors(err: Erro, req: Request, res: Response, next: NextFunction) {
  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res
      .status(HttpStatus.CONFLICT)
      .send({ message: err.message, email: err.email });
  }

  if (err.name === "InvalidCredentialsError") {
    return res.status(HttpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(HttpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(HttpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
