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

//check if phone exists
const phoneExists = check('phone').custom(async (value: any) => {
  const user = await prisma.users.findUnique({
    where: { phone: value },
  });

  if (user) {
    throw new Error('Phone already exists.')
  }
})

// check if gender is valid
const gender = check('gender').custom(async (value: string) => {
  if ((value !== "male") && (value !== "female") && (value !== "attack-helicopter")) {
    throw new Error('gender not supported :)')
  }
})

// check if phone is valid
const phone = check('phone').custom(async (value: string) => {
  if (value.length !== 3+11) {
    throw new Error('invalid phone number')
  }

  if (value.substring(0,3) !== '+88') {
    throw new Error('invalid phone number')
  }

  if (value.substring(3,14).match(/^[0-9]+$/) === null) {
    throw new Error('invalid phone number')
  }
})


// check if date of birth is valid (age >= 18)
const dob = check('dob').custom(async (value: string) => {
  const today = new Date();
  const birthDate = new Date(value);
  if (today.getFullYear() - birthDate.getFullYear() < 18) {
    throw new Error('You must be 18 or older to register.')
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

  // check if user has verified email
  // if (!user.verified) {
  //   throw new Error('Please verify your email.')
  // }

  // if everything is ok
  req.user = user;
  // pass the user to the next middleware(login function)

})







export const registerValidation = [email, phone, gender, dob, password, emailExists, phoneExists]
export const loginValidation = [loginCheck]

