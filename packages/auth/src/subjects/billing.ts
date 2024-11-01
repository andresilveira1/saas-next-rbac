import * as zod from 'zod'

export const billingSubject = zod.tuple([
  zod.union([zod.literal('manage'), zod.literal('get'), zod.literal('export')]),
  zod.literal('Billing'),
])

export type BillingSubject = zod.infer<typeof billingSubject>
