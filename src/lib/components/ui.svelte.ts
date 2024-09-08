import { playerState } from '$lib/stores/player.svelte';

let menu = $state(false);
let playerModalState = $state(false);

export function useUI() {
	return {
		get menuOpen() {
			return menu;
		},
		set menuOpen(value) {
			menu = value;
		},
		get player() {
			return playerState.feed.id !== '';
		},
		get playerModal() {
			return playerModalState;
		},
		set playerModal(value) {
			playerModalState = value;
		}
	};
}
