import type { ContractRouterClient } from "@orpc/contract";
import type { contract } from "#/orpc";

export const useApi = () => {
	const { $api } = useNuxtApp();
	return $api as ContractRouterClient<typeof contract>;
};
