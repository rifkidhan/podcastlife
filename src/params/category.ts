import type { ParamMatcher } from "@sveltejs/kit";
import { CATEGORIES } from "$lib/utils/constants";

export const match: ParamMatcher = (param) => {
	return CATEGORIES.some((v) => v.id === param);
};
