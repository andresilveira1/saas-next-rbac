import * as zod from 'zod'

export const inviteSubject = zod.tuple([
  zod.union([
    zod.literal('manage'),
    zod.literal('get'),
    zod.literal('create'),
    zod.literal('delete'),
  ]),
  zod.literal('Invite'),
])

export type InviteSubject = zod.infer<typeof inviteSubject>
