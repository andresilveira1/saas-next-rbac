import * as zod from 'zod'

import { organizationSchema } from '../models/organization'

export const organizationSubject = zod.tuple([
  zod.union([
    zod.literal('manage'),
    zod.literal('update'),
    zod.literal('delete'),
    zod.literal('transfer_ownership'),
  ]),
  zod.union([zod.literal('Organization'), organizationSchema]),
])

export type OrganizationSubject = zod.infer<typeof organizationSubject>
