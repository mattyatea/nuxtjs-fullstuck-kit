import { oc } from "@orpc/contract";
import { example } from "@/shared/orpc/example";

export const contract = oc.router({
	example,
});
