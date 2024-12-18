import { createEnv } from '@t3-oss/env-nextjs'
import * as zod from 'zod'

export const env = createEnv({
  server: {
    PORT: zod.coerce.number().default(3333),
    JWT_SECRET: zod.string(),
    DATABASE_URL: zod.string().url(),
    GITHUB_OAUTH_CLIENT_ID: zod.string(),
    GITHUB_OAUTH_CLIENT_SECRET: zod.string(),
    GITHUB_OAUTH_CLIENT_REDIRECT_URI: zod.string().url(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: zod.string().url(),
  },
  runtimeEnv: {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    GITHUB_OAUTH_CLIENT_REDIRECT_URI:
      process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
})
