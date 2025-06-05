import { os } from '@orpc/server'
import { dbProviderMiddleware } from './middlewares/db'
import type { PrismaClient } from '~/prisma-client'

export interface ORPCContext {
  db: PrismaClient
}

export const pub = os
  .$context<ORPCContext>()
  .use(dbProviderMiddleware)
