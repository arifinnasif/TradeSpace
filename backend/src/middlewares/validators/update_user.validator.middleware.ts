import { check } from 'express-validator';

// import prisma
import prisma from '../../../prisma/prisma_client';

//check if phone exists
const phoneExists = check('phone').custom(async (value: any) => {
  const user = await prisma.users.findUnique({
    where: { phone: value },
  });

  if (user) {
    throw new Error('Phone already exists.')
  }
})


// check if phone is valid
const phone = check('phone').custom(async (value: string) => {
  if (value.length !== 3 + 11) {
    throw new Error('invalid phone number')
  }

  if (value.substring(0, 3) !== '+88') {
    throw new Error('invalid phone number')
  }

  if (value.substring(3, 14).match(/^[0-9]+$/) === null) {
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



export const update_user_validation = [phoneExists, phone, dob]