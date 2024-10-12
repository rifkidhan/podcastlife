import { Icons } from '$components/Icons';
import Icon from '$components/ui/icon';
import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import s from './theme-switcher.module.css';

type Theme = 'auto' | 'light' | 'dark';

const preferColor = (): Theme =>
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const dataSelected: { id: Theme; icon: keyof typeof Icons }[] = [
	{
		id: 'auto',
		icon: 'computer'
	},
	{
		id: 'light',
		icon: 'sun'
	},
	{
		id: 'dark',
		icon: 'moon'
	}
];

export default function ThemeSwitcher() {
	const THEMES: Theme[] = ['auto', 'light', 'dark'];
	const [themeIndex, setThemeIndex] = createSignal(0);
	const theme = () => THEMES[themeIndex()];
	const key = 'podcastlife-theme';

	const storeTheme = (theme: string) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(key, theme);
		}
	};

	const update = () => {
		setThemeIndex((themeIndex() + 1) % THEMES.length);

		storeTheme(theme());
		document.documentElement.dataset.theme = theme() === 'auto' ? preferColor() : theme();
	};

	const sync = () => {
		const stored = typeof localStorage !== 'undefined' && localStorage.getItem(key);

		if (stored === 'undefined') {
			storeTheme(theme());
		} else {
			setThemeIndex(THEMES.findIndex((v) => v === stored));
		}
	};

	const queryCallback = (e: MediaQueryListEvent) => {
		setThemeIndex(e.matches ? 2 : 1);
	};

	onMount(() => {
		sync();
	});

	createEffect(() => {
		window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', queryCallback);

		if (theme() === 'auto') {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', queryCallback);
		}

		onCleanup(() => {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', queryCallback);
		});
	});

	return (
		<button
			type="button"
			class={s['theme-selector']}
			data-selected={theme()}
			aria-label="theme"
			onClick={update}
		>
			<span class={s.selected} aria-hidden="true" />
			<For each={dataSelected}>
				{({ id, icon }) => (
					<span data-selected={id === theme()} class={s['theme-icon']}>
						<Icon name={icon} />
					</span>
				)}
			</For>
		</button>
	);
}
