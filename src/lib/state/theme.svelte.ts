import { MediaQuery } from "svelte/reactivity";
import { Persisted } from "./persisted.svelte";

class Theme {
	#preference = new Persisted<"auto" | "light" | "dark">("podcastlife:theme", "auto");
	#query = new MediaQuery("prefers-color-scheme: dark");
	#system = $derived<"dark" | "light">(this.#query.current ? "dark" : "light");

	get current() {
		return this.#preference.current === "auto" ? this.#system : this.#preference.current;
	}

	set current(v: "light" | "dark") {
		this.#preference.current = v === this.#system ? "auto" : v;
	}
}

export const theme = new Theme();
