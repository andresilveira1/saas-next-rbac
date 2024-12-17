import { api } from './api-client'

interface DeleteProjectRequest {
  org: string
  projectId: string
}

export async function deleteProject({ org, projectId }: DeleteProjectRequest) {
  await api.delete(`organizations/${org}/projects/${projectId}`)
}
