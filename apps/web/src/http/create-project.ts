import { api } from './api-client'

interface CreateProjectRequest {
  name: string
  description: string
  org: string
}

type CreateProjectResponse = void

export async function createProject({
  name,
  description,
  org,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
  await api.post(`organizations/${org}/projects`, {
    json: {
      name,
      description,
    },
  })
}
