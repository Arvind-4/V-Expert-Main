import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { TOKEN_SECRET } from "../constants/index.mjs";
import { db } from "../index.mjs";

const generateAccessToken = async (email) => {
  return jwt.sign(email, TOKEN_SECRET, { expiresIn: "86400s" });
};

const findUser = async (id) => {
  try {
    const userCollection = await db.collection("users");
    const { props } = await userCollection.get(id);
    if (props) {
      return props;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const generateTokenForUser = async (body) => {
  try {
    if (!body.email || !body.password) return null;
    const usereCollection = await db.collection("users");
    const { email, password } = body;
    const { results } = await usereCollection.filter({ email });
    const user = results[0].props;
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = await generateAccessToken({ email: user.email });
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const createUserService = async (body) => {
  try {
    const userCollection = await db.collection("users");
    const { email, password } = body;
    if (!email || !password) return null;
    const userId = uuidv4();
    let hashedPassword = await bcrypt.hash(password, 8);
    const user = {
      id: userId,
      email: email,
      password: hashedPassword,
    };
    await userCollection.set(userId, user);
    return user;
  } catch (e) {
    return null;
  }
};

export { createUserService, findUser, generateTokenForUser };
