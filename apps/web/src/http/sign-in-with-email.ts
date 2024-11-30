import { api } from './api-client'

interface SignInWithEmailRequest {
  email: string
  password: string
}
interface SignInWithEmailResponse {
  token: string
}

export async function signInWithEmail({
  email,
  password,
}: SignInWithEmailRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithEmailResponse>()

  return result
}
