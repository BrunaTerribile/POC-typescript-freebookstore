import { hash, compare } from "bcrypt-ts";
import userRepositories from "../repositories/userRepositories";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";
import { LoginUser, UserData } from "../protocols/User";

async function create({ name, email, password }: UserData) {
  const { rowCount } = await userRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password }: LoginUser) {
  const {
    rowCount,
    rows: [user],
  } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = uuidV4();
  await userRepositories.createSession({ token, userId: user.id });

  return token;
}

export default {
  create,
  signin,
};
