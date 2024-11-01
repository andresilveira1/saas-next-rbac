import * as zod from 'zod'

import { projectSchema } from '../models/project'

export const projectSubject = zod.tuple([
  zod.union([
    zod.literal('manage'),
    zod.literal('get'),
    zod.literal('create'),
    zod.literal('update'),
    zod.literal('delete'),
  ]),
  zod.union([zod.literal('Project'), projectSchema]),
])

export type ProjectSubject = zod.infer<typeof projectSubject>
