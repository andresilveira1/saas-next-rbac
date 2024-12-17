import { api } from './api-client'

interface GetProjectRequest {
  org: string
  project: string
}

interface GetProjectResponse {
  project: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    ownerId: string
    organizationId: string
    description: string
    owner: {
      name: string | null
      id: string
      avatarUrl: string | null
    }
  }
}

export async function getProject({ org, project }: GetProjectRequest) {
  const result = await api
    .get(`organizations/${org}/projects/${project}`)
    .json<GetProjectResponse>()

  return result
}
