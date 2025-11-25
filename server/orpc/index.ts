import {implement} from '@orpc/server'
import { dbProviderMiddleware } from '../middlewares/db'
import type { PrismaClient } from '~/prisma-client'
import {contract} from "#shared/orpc/contract";

export interface ORPCContext {
  db: PrismaClient
}

const baseOS = implement(contract);

export const os = baseOS
  .$context<ORPCContext>()
  .use(dbProviderMiddleware)
