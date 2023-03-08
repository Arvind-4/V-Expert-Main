import logger from "../utils/logger.mjs";

import {
  createUserService,
  generateTokenForUser,
  findUser,
  verifyToken,
} from "../services/userServices.mjs";

const signUp = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    if (user === null) {
      res.status(424).json({
        message: "Unable to Create User",
        success: false,
        data: null,
      });
    } else {
      res.status(201).json({
        data: user,
        success: true,
        message: "User Created",
      });
    }
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ message: "User Id Required", success: false, data: null });
  try {
    const user = await findUser(id);
    if (user)
      res.status(200).json({
        data: user,
        success: true,
        message: "User Found",
      });
    else
      res.status(404).json({
        message: "No User Found",
        success: false,
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const token = await generateTokenForUser(req.body);
    if (token)
      res.status(201).json({
        data: token,
        success: true,
        message: "Token Generated",
      });
    else
      res.status(424).json({
        message: "Wrong Credentials",
        success: false,
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

const checkToken = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res
        .status(400)
        .json({ message: "Token Required", success: false, data: null });
    const user = await verifyToken(token);
    if (user)
      res.status(200).json({
        data: user,
        success: true,
        message: "Token Valid",
      });
    else
      res.status(401).json({
        message: "Token Invalid",
        success: false,
        data: null,
      });
  } catch (e) {
    logger.error(`Enable to call DB functions ${e}`);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      data: null,
    });
  }
};

export { signUp, getUser, signIn, checkToken };
