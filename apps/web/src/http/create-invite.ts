import type { Role } from '@saas/auth'

import { api } from './api-client'

interface CreateInviteRequest {
  email: string
  role: Role
  org: string
}

type CreateInviteResponse = void

export async function createInvite({
  email,
  role,
  org,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  await api.post(`organizations/${org}/invites`, {
    json: {
      email,
      role,
    },
  })
}
