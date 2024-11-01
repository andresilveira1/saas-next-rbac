import * as zod from 'zod'

export const userSubject = zod.tuple([
  zod.union([
    zod.literal('manage'),
    zod.literal('get'),
    zod.literal('update'),
    zod.literal('delete'),
  ]),
  zod.literal('User'),
])

export type UserSubject = zod.infer<typeof userSubject>
