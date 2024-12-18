import { playerDetail } from "$lib/stores/player.svelte";

let menu = $state(false);
let playerFull = $state(false);

export const useUI = () => {
	return {
		get menuOpen() {
			return menu;
		},
		set menuOpen(value) {
			menu = value;
		},
		get player() {
			return playerDetail().feed.id !== "";
		},
		get playerModal() {
			return playerFull;
		},
		set playerModal(value) {
			playerFull = value;
		}
	};
};
