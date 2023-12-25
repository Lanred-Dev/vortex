import { PUBLIC_ENDPOINT } from "$env/static/public";
import type { PageLoad } from "./$types";
import type { mode } from "$lib/core/types";

export const load: PageLoad = async ({ fetch }) => {
    try {
        const result = await fetch(`${PUBLIC_ENDPOINT}get`);
        const { modes }: { modes: mode[] } = await result.json();

        return { modes };
    } catch {
        return { modes: [] };
    }
};
