import { implement } from '@orpc/server'
import { dbProviderMiddleware } from '@/server/middlewares/db'
import { contract } from '#shared/orpc'
import type { PrismaClient } from '@/server/prisma-client'

export interface ORPCContext {
  db: PrismaClient
}

const baseOS = implement(contract)

export const os = baseOS
  .$context<ORPCContext>()
  .use(dbProviderMiddleware)
