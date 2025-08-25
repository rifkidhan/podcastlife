import { audiometadata } from "./player.svelte";
import { page } from "$app/state";

class UIState {
	#menu = $state(false);

	get menuOpen() {
		return this.#menu;
	}

	set menuOpen(value) {
		this.#menu = value;
	}

	get playerShown() {
		return audiometadata.track.enclosure !== "";
	}
	get inert() {
		return this.#menu || page.state.fullPlayer;
	}
}

export const useUI = new UIState();
