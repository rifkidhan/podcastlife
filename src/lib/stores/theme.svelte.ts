import { browser } from '$app/environment';

interface Themes {
	preferences: 'light' | 'dark' | 'system';
	current: 'light' | 'dark';
}

export function createTheme() {
	let themes = $state<Themes>({
		preferences: 'system',
		current: browser
			? window.matchMedia('(prefers-color-schema: dark)').matches
				? 'dark'
				: 'light'
			: 'light'
	});

	const storage = typeof window !== 'undefined' ? (window.localStorage ?? undefined) : undefined;

	const updateThemes = () => {
		const upcoming_themes = themes.current === 'light' ? 'dark' : 'light';

		if (
			upcoming_themes ===
			(window.matchMedia('(prefers-color-schema: dark)').matches ? 'dark' : 'light')
		) {
			themes.preferences = 'system';
		} else {
			themes.preferences = upcoming_themes;
		}

		themes.current = upcoming_themes;

		storage?.setItem('pl:themes', JSON.stringify($state.snapshot(themes)));
		document.documentElement.removeAttribute('data-theme');
		document.documentElement.dataset.theme = themes.current;
	};

	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			themes = { ...themes, current: e.matches ? 'dark' : 'light' };
		});
		window.addEventListener('storage', (e) => {
			if (e.key === 'pl:themes') sync();
		});
	}

	const sync = () => {
		const storedData = storage?.getItem('pl:themes');

		if (storedData === null || storedData === undefined) {
			storage?.setItem('pl:themes', JSON.stringify($state.snapshot(themes)));
		} else {
			themes = JSON.parse(storedData);
		}
	};

	sync();

	return {
		get themes() {
			return themes;
		},
		updateThemes
	};
}
