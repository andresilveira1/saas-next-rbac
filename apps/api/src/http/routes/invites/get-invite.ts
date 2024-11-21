import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import * as zod from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function getInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/invites/:inviteId',
    {
      schema: {
        tags: ['invites'],
        summary: 'Get an invite',
        params: zod.object({
          inviteId: zod.string().uuid(),
        }),
        response: {
          200: zod.object({
            invite: zod.object({
              id: zod.string().uuid(),
              email: zod.string().email(),
              role: roleSchema,
              createdAt: zod.date(),
              author: zod
                .object({
                  id: zod.string().uuid(),
                  name: zod.string().nullable(),
                  avatarUrl: zod.string().url().nullable(),
                })
                .nullable(),
              organization: zod.object({
                name: zod.string(),
              }),
            }),
          }),
        },
      },
    },
    async (request) => {
      const { inviteId } = request.params

      const invite = await prisma.invite.findUnique({
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          organization: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: inviteId,
        },
      })

      if (!invite) {
        throw new BadRequestError('Invite not found.')
      }

      return { invite }
    },
  )
}
