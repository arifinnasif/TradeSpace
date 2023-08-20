import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
const { SECRET } = require("../constants");
import { sendRandomMail, sendVerificationMail } from "../services/mailService";
import { request_to_send_opt } from "../services/twilio_phone_verification";
import crypto from "crypto";

// import prisma
import { PrismaClient } from "@prisma/client";
import { request } from "http";
import { token } from "morgan";
const prisma = new PrismaClient();

declare global {
  namespace Express {
    export interface User {
      username: string;
      email?: string;
      // phone_verified?: boolean; // not needed
      // email_verified?: boolean; // not needed
    }
  }
}

// get user list: /api/auth/getUsers
// DELETE later
let getUsers = async (req: Request, res: Response) => {
  try {
    const userList = await prisma.users.findMany({
      select: {
        username: true,
        name: true,
        email: true,
      },
    });
    return res.json(userList);
  } catch (error) {
    console.log(error);
  }
};

// register user: /api/auth/register
let registerUser = async (req: Request, res: Response) => {
  const { username, name, email, phone, gender, dob, password } = req.body;

  try {
    const hashedPassword = await hash(password, 12);
    await prisma.users.create({
      data: {
        username: username,
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        dob: new Date(dob),
        password: hashedPassword,
      },
    });

    // token creation for email verification
    let email_token = crypto.randomBytes(32).toString("hex");

    // entry to tokenEmail table
    await prisma.temp_emailtoken.create({
      data: {
        username: username,
        token: email_token,
      },
    });

    // send verification-email and otp-message
    await Promise.all([
      sendVerificationMail(name, username, email, email_token),
      request_to_send_opt(phone),
    ]);

    let payload = {
      username: username,
      email: email,
    };
    const jwt_token = await sign(payload, SECRET);

    return res.status(201).cookie("token", jwt_token, { httpOnly: true }).json({
      success: true,
      message: "User created!",
      token: jwt_token,
    });

    // return res.status(201).json({
    //   success: true,
    //   message: "The registraion was succefull",
    // });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// login user: /api/auth/login
let loginUser = async (req: Request, res: Response) => {
  // catch the user from the loginCheck middleware

  // const user: any = req.user;

  // create a payload
  // username will be used for passport-jwt
  let payload = {
    username: req.user!.username,
    email: req.user!.email,
  };

  try {
    // create a token
    //const token = await sign(payload, SECRET, { expiresIn: '1h' });
    const token = await sign(payload, SECRET);

    // send the token in a HTTP-only cookie
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        //sameSite: "strict",
      })
      .json({
        success: true,
        message: "Logged in successfully!",
        token: token,
      });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

let logoutUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

let protectedRoute = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      data: "This is a protected route",
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

let verifyEmail = async (req: Request, res: Response) => {
  const username = req.params.username;
  const token = req.params.token;

  // find user from "users" table.
  // here users.verified will be false
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  // if user does not exist, return error
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User does not exist!",
    });
  }

  // find the token from "tokenEmail" table
  const tokenObj = await prisma.temp_emailtoken.findUnique({
    where: {
      username: username,
    },
  });

  // if tokenFromDB does not match with tokenFromRoute, return error
  if (token != tokenObj!.token) {
    return res.status(401).json({
      success: false,
      message: "Invalid Link!",
    });
  } else {
    // user is verified
    // update the "users" table
    await prisma.users.update({
      where: {
        username: username,
      },
      data: {
        email_verified: true,
      },
    });

    // now delete the token from tokenEmail table
    await prisma.temp_emailtoken.delete({
      where: {
        username: username,
      },
    });

    // send successful response
    return res.status(200).json({
      success: true,
      message: "Email verified!",
    });
  }
};

// login admin: /api/admin/login
let loginAdmin = async (req: Request, res: Response) => {
  // catch the user from the loginCheck middleware
  // const user: any = req.user;

  // create a payload
  // username will be used for passport-jwt
  let payload = {
    username: req.user!.username,
    email: req.user!.email,
  };

  try {
    // create a token
    //const token = await sign(payload, SECRET, { expiresIn: '1h' });
    const token = await sign(payload, SECRET);

    // send the token in a HTTP-only cookie
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Logged in successfully!",
        token: token,
      });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// logout admin: /api/admin/logout
let logoutAdmin = async (req: Request, res: Response) => {
  try {
    // remove the token from the cookie
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  getUsers,
  registerUser,
  loginUser,
  protectedRoute,
  logoutUser,
  verifyEmail,
  loginAdmin,
  logoutAdmin,
};
