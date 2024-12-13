import type { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembersRequest {
  org: string
}

interface GetMembersResponse {
  members: {
    id: string
    userId: string
    role: Role
    name: string | null
    email: string
    avatarUrl: string | null
  }[]
}

export async function getMembers({ org }: GetMembersRequest) {
  const result = await api
    .get(`organizations/${org}/members`)
    .json<GetMembersResponse>()

  return result
}
