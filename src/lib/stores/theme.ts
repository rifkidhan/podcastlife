import { browser } from '$app/environment';
import { persisted } from 'svelte-persisted-store';

interface Themes {
	preference: 'light' | 'dark' | 'system';
	current: 'light' | 'dark';
}
export const themes = persisted<Themes>('pl:theme', {
	preference: 'system',
	current: browser
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: 'light'
});

themes.subscribe(($themes) => {
	if (!browser) return;

	document.documentElement.classList.remove('dark', 'light');
	document.documentElement.classList.add($themes.current);
});
