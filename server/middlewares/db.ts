import type { PrismaClient } from "@/server/prisma-client";
import { os } from "@orpc/server";

export const dbProviderMiddleware = os
	.$context<{ db: PrismaClient }>()
	.middleware(async ({ context, next }) => {
		const db: PrismaClient = context.db;

		return next({
			context: {
				db,
			},
		});
	});
