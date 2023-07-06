import { check } from 'express-validator';
import { compare } from 'bcryptjs';

// import prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ------------------ Registration Validation ------------------ //

// email validation
const email = check('email')
  .isEmail()
  .withMessage('Please provide a valid email.')

// password validation
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password has to be between 6 and 15 characters.')

//check if email exists
const emailExists = check('email').custom(async (value: any) => {
  const user = await prisma.users.findUnique({
    where: { email: value },
  });


  if (user) {
    throw new Error('Email already exists.')
  }
})




// ------------------ Login Validation ------------------ //

const loginCheck = check('email').custom(async (value: any, {req}) => {
  // check if email exists
  const user = await prisma.users.findUnique({
    where: { email: value },
  });

  if (!user) {
    throw new Error('Email does not exist.')
  }


  // check if password is correct
  const isMatch = await compare(req.body.password, user.password);

  if (!isMatch) {
    throw new Error('Invalid password.')
  }

})

export const registerValidation = [email, password, emailExists]
export const loginValidation = [loginCheck]

