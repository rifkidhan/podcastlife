import { playerState } from '$lib/stores/player.svelte';

let menu = $state(false);

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
		}
	};
}
