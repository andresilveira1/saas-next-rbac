import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import * as zod from 'zod'

import { prisma } from '@/lib/prisma'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/profile',
    {
      schema: {
        tags: ['auth'],
        summary: 'Get authenticated user profile',
        response: {
          200: zod.object({
            user: zod.object({
              id: zod.string().uuid(),
              name: zod.string().nullable(),
              email: zod.string().email(),
              avatarUrl: zod.string().url().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { sub } = await request.jwtVerify<{ sub: string }>()

      const user = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
        where: {
          id: sub,
        },
      })

      if (!user) {
        throw new Error('User not found.')
      }

      return reply.send({ user })
    },
  )
}
