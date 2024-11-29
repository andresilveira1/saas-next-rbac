import { api } from './api-client'

interface SignInWIthEmailRequest {
  email: string
  password: string
}
interface SignInWIthEmailResponse {
  token: string
}

export async function signInWithEmail({
  email,
  password,
}: SignInWIthEmailRequest) {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWIthEmailResponse>()

  return result
}
