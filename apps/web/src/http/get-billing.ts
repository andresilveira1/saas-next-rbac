import { api } from './api-client'

interface GetBillingRequest {
  org: string
}

interface GetBillingResponse {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling({ org }: GetBillingRequest) {
  const result = await api
    .get(`organizations/${org}/billing`)
    .json<GetBillingResponse>()

  return result
}
