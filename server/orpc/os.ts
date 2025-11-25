import { implement } from '@orpc/server'
import { dbProviderMiddleware } from '../middlewares/db'
import { contract } from '#shared/orpc/contract'
import type { PrismaClient } from '../../prisma-client/client'

export interface ORPCContext {
  db: PrismaClient
}

const baseOS = implement(contract)

export const os = baseOS
  .$context<ORPCContext>()
  .use(dbProviderMiddleware)
