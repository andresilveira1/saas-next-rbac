import * as zod from 'zod'

export const roleSchema = zod.union([
  zod.literal('ADMIN'),
  zod.literal('MEMBER'),
  zod.literal('BILLING'),
])

export type Role = zod.infer<typeof roleSchema>
