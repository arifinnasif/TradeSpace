import passport from "passport";
import { Strategy } from "passport-jwt";
const { SECRET } = require("../constants");

// import prisma

import prisma from '../../prisma/prisma_client';
// const prisma = new PrismaClient();


// check if a user sends cookie with a token
const cookieExtractor = function (req: any) {

  let token_from_authorization = null;
  let token_from_cookie = null;
  // console.log(req.headers.authorization);


  if (req && req.headers) token_from_authorization = req.headers.authorization;
  if (req && req.cookies) token_from_cookie = req.cookies.token;

  if (token_from_authorization !== null) return token_from_authorization;
  // console.log(token);
  return token_from_cookie;
};

// options for passport-jwt
const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

/*
    In the next passport.use() function:
    
    username is the payload from jwt --
    created in the login controller.

    we will use this id from the jwt-token to find the user
*/

passport.use('user-rule',
  new Strategy(opts, async ({ username }, done) => {
    try {

      console.log("user", username);

      const user: {
        username: string;
        email: string;
        email_verified?: boolean;
        phone_verified?: boolean;
      } | null = await prisma.users.findUnique({
        where: {
          username: username
        },

        select: {
          username: true,
          email: true,
          phone_verified: true,
          email_verified: true,
        }
      })

      if (!user) {
        throw new Error('401 not authorized')
      }

      if (user.phone_verified === false || user.email_verified === false) {
        throw new Error('401 not authorized')
      }


      delete user.email_verified;
      delete user.phone_verified;



      return await done(null, user)
      // will use this user for protected routes
    } catch (error: any) {
      console.log(error.message)
      done(null, false)

    }
  })
);


passport.use('non-phone-verified-user-rule',
  new Strategy(opts, async ({ username }, done) => {
    try {
      console.log("nonuser", username);

      const user = await prisma.users.findUnique({
        where: {
          username: username
        },

        select: {
          username: true,
          email: true,
          // phone_verified: true,
          // email_verified: true,
        }
      })

      if (!user) {
        throw new Error('401 not authorized')
      }


      return await done(null, user)
      // will use this user for protected routes
    } catch (error: any) {
      console.log(error.message)
      done(null, false)
    }
  })
)


passport.use('admin-rule',
  new Strategy(opts, async ({ username }, done) => {
    try {

      console.log("admin", username);

      const user = await prisma.admins.findUnique({
        where: {
          username: username
        },

        select: {
          username: true,
          email: true,
        }
      })

      if (!user) {
        throw new Error('401 not authorized')
      }


      return await done(null, user)
      // will use this user for protected routes
    } catch (error: any) {
      console.log(error.message)
      done(null, false)
    }
  })
);
