import * as zod from 'zod'

import { roleSchema } from '../roles'

export const userSchema = zod.object({
  id: zod.string(),
  role: roleSchema,
})

export type User = zod.infer<typeof userSchema>
