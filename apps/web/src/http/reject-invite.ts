import { api } from './api-client'

interface RejectInviteRequest {
  inviteId: string
}

export async function rejectInvite({ inviteId }: RejectInviteRequest) {
  await api.post(`invites/${inviteId}/reject`)
}
