import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import * as zod from 'zod'

import { prisma } from '@/lib/prisma'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: zod.object({
          name: zod.string(),
          email: zod.string().email(),
          password: zod.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const userEmailExists = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userEmailExists) {
        return reply
          .status(400)
          .send({ message: 'user with same e-mail already exists' })
      }

      const passwordHash = await hash(password, 6)

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      })

      return reply.status(201).send()
    },
  )
}
