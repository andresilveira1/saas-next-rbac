import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import * as zod from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Get details from organization',
          security: [{ bearerAuth: [] }],
          params: zod.object({ slug: zod.string() }),
          response: {
            200: zod.object({
              organization: zod.object({
                id: zod.string().uuid(),
                name: zod.string(),
                slug: zod.string(),
                domain: zod.string().nullable(),
                shouldAttachUsersByDomain: zod.boolean(),
                avatarUrl: zod.string().url().nullable(),
                createdAt: zod.date(),
                updatedAt: zod.date(),
                ownerId: zod.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params
        const { organization } = await request.getUserMembership(slug)

        return {
          organization,
        }
      },
    )
}
