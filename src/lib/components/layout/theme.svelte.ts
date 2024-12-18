import { browser } from "$app/environment";

type Theme = "auto" | "light" | "dark";

const THEMES: Theme[] = ["auto", "light", "dark"];

export class Themes {
	private themeIndex = $state(0);
	theme: Theme = $derived(THEMES[this.themeIndex]);
	private key = "podcastlife-theme";

	constructor() {
		this.matchMedia();
		this.sync();
	}

	private sync = () => {
		const stored = typeof localStorage !== "undefined" && localStorage.getItem(this.key);

		if (stored === "undefined") {
			this.storeTheme(this.theme);
		} else {
			this.themeIndex = THEMES.findIndex((v) => v === stored);
		}
	};

	private matchMedia = () => {
		if (browser) {
			window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
				this.themeIndex = e.matches ? 2 : 1;
			});
			window.addEventListener("storage", (e) => {
				if (e.key === this.key) this.sync();
			});
		}
	};

	update = () => {
		this.themeIndex = (this.themeIndex + 1) % THEMES.length;

		this.storeTheme(this.theme);
		document.documentElement.dataset.theme =
			this.theme === "auto" ? this.preferColor() : (this.theme as string);
	};

	private storeTheme = (theme: Theme) => {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem(this.key, theme);
		}
	};

	private preferColor = () =>
		browser
			? window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
			: "light";
}
