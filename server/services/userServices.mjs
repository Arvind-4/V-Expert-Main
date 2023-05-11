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
    const { email, password, name } = body;
    if (!email || !password) return null;

    const emailProps = await userCollection.filter({ email });
    if (emailProps.results.length > 0) return null;

    const nameProps = await userCollection.filter({ name });
    if (nameProps.results.length > 0) return null;

    const userId = uuidv4();
    let hashedPassword = await bcrypt.hash(password, 8);
    const user = {
      id: userId,
      name: name,
      email: email,
      password: hashedPassword,
    };
    await userCollection.set(userId, user);
    return user;
  } catch (e) {
    return null;
  }
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
};


const changePasswordService = async (email, oldpassword, newpassword) => {
  try {
    const userCollection = await db.collection("users");
    const emailProps = await userCollection.filter({ email });
    if (emailProps.results.length === 0) return null;
    const user = emailProps.results[0].props;
    const validPassword = await bcrypt.compare(oldpassword, user.password);

    if (!validPassword) return null;

    const hashedPassword = await bcrypt.hash(newpassword, 8);
    user.password = hashedPassword;

    const newUser = {
      id: user.id,
      password: hashedPassword,
      email: user.email,
      name: user.name,
    }
    await userCollection.set(newUser.id, newUser);
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

const deleteAllUsersService = async () => {
  try {
    const userCollection = await db.collection("users");
    const { results } = await userCollection.list();
    for (let i = 0; i < results.length; i++) {
      console.log("Deleting Key", results[i].key);
      await userCollection.delete(results[i].key);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { createUserService, findUser, generateTokenForUser, verifyToken, changePasswordService, deleteAllUsersService };