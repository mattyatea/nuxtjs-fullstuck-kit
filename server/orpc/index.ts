import { os } from "./os";
import { example } from "./procedures/example";

export { os };

export const router = os.router({
	example,
});
