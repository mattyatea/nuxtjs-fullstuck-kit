import { RPCHandler } from "@orpc/server/node";
import { router } from "@/server/orpc";
import { prisma } from "@/server/prisma-client";

const handler = new RPCHandler(router);

export default defineEventHandler(async (event) => {
	const { matched } = await handler.handle(event.node.req, event.node.res, {
		prefix: "/rpc",
		context: {
			db: prisma,
		},
	});

	if (matched) {
		return;
	}

	setResponseStatus(event, 404, "Not Found");
	return "Not found";
});
