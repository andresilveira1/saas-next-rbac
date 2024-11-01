import * as zod from 'zod'

export const projectSchema = zod.object({
  __typename: zod.literal('Project').default('Project'),
  id: zod.string(),
  ownerId: zod.string(),
})

export type Project = zod.infer<typeof projectSchema>
