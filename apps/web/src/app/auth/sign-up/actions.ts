'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import * as zod from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = zod
  .object({
    name: zod.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name.',
    }),
    email: zod
      .string()
      .email({ message: 'Please, provide a valid e-mail address.' }),
    password: zod
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    password_confirmation: zod.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  redirect('/auth/sign-in')
}
