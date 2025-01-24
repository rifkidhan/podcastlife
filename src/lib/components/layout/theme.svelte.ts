import { on } from "svelte/events";
import { createSubscriber, MediaQuery } from "svelte/reactivity";

class Persisted<T extends string = string> {
	#key: string;
	#storage: Storage | undefined;
	#fallback: T;
	#version = $state(0);

	#subscribe = createSubscriber((update) => {
		return on(window, "storage", (e) => {
			if (e.key === this.#key) {
				update();
			}
		});
	});

	constructor(
		key: string,
		fallback: T,
		storage = typeof localStorage === "undefined" ? undefined : localStorage
	) {
		this.#key = key;
		this.#fallback = fallback;
		this.#storage = storage;
	}

	get current() {
		this.#subscribe();
		this.#version;

		return (this.#storage?.getItem(this.#key) as T) ?? this.#fallback;
	}

	set current(v: T) {
		this.#storage?.setItem(this.#key, v);
		this.#version += 1;
	}
}

class Theme {
	#preference = new Persisted<"system" | "light" | "dark">("podcastlife-theme", "system");
	#query = new MediaQuery("prefers-color-scheme: dark");
	#system = $derived<"light" | "dark">(this.#query.current ? "dark" : "light");

	get current() {
		return this.#preference.current === "system" ? this.#system : this.#preference.current;
	}

	set current(v: "system" | "light" | "dark") {
		this.#preference.current = v === this.#system ? "system" : v;
	}
}

export const theme = new Theme();
