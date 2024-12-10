'use server'

import { HTTPError } from 'ky'
import * as zod from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const ProjectSchema = zod.object({
  name: zod
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: zod.string(),
})

export async function createProjectAction(data: FormData) {
  const result = ProjectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  const orgSlug = await getCurrentOrg()

  try {
    await createProject({
      name,
      description,
      org: orgSlug!,
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

  return {
    success: true,
    message: 'Successfully saved the project.',
    errors: null,
  }
}
