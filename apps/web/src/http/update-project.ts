import { api } from './api-client'

interface UpdateProjectRequest {
  org: string
  projectId: string
  name: string
  description: string
}

type UpdateProjectResponse = void

export async function updateProject({
  org,
  projectId,
  name,
  description,
}: UpdateProjectRequest): Promise<UpdateProjectResponse> {
  await api.put(`organizations/${org}/projects/${projectId}`, {
    json: {
      name,
      description,
    },
  })
}
