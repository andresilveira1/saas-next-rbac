import * as zod from 'zod'

export const organizationSchema = zod.object({
  __typename: zod.literal('Organization').default('Organization'),
  id: zod.string(),
  ownerId: zod.string(),
})

export type Organization = zod.infer<typeof organizationSchema>
