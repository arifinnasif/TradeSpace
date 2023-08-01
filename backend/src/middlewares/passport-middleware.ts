import passport from 'passport'
import { Strategy } from 'passport-jwt'
const { SECRET } = require('../constants')



// import prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



// check if a user sends cookie with a token
const cookieExtractor = function (req: any) {
  let token = null
  
  if (req && req.cookies) 
    token = req.cookies['token']

  return token
}



// options for passport-jwt
const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}




/*
    In the next passport.use() function:
    
    username is the payload from jwt --
    created in the login controller.

    we will use this id from the jwt-token to find the user
*/
passport.use(
  new Strategy(opts, async ({ username }, done) => {
    try {

        const user = await prisma.users.findUnique({
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

        if(user.phone_verified === false || user.email_verified === false) {
            throw new Error('401 not authorized')
        }

        
        return await done(null, user)
        // will use this user for protected routes
    } catch (error:any) {
      console.log(error.message)
      done(null, false)
    }
  })
)