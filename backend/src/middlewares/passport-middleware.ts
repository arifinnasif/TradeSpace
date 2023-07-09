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
    
    user_id is the payload from jwt --
    created in the login controller.

    we will use this id from the jwt-token to find the user
*/
passport.use(
  new Strategy(opts, async ({ user_id }, done) => {
    try {

        const user = await prisma.users.findUnique({
            where: {
                user_id: user_id
            },

            select: {
                user_id: true,
                email: true
            }
        })

        if (!user) {
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