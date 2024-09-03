<script lang="ts">
	import { Button } from '$lib/components';
	import { createTheme } from '$lib/stores/theme.svelte';
	const themes = createTheme();

	let current_themes = $derived(themes.themes.current);
</script>

<Button
	id="themeButton"
	variant="primary"
	size="md"
	aria-label={current_themes}
	onclick={themes.updateThemes}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
		class="darkmode"
	>
		<mask class="moon" id="moon-mask">
			<rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
			<circle cx="24" cy="10" r="6" fill="black"></circle>
		</mask>
		<circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor"></circle>
		<g class="sun-beams" stroke="currentColor">
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</g>
	</svg>
</Button>

<style>
	.darkmode {
		height: 100%;
		width: 100%;

		& > :is(.moon, .sun, .sun-beams) {
			transform-origin: center;
		}
		& > :is(.moon, .sun) {
			fill: var(--accent-95);
		}
		.sun-beams {
			stroke-width: 2;
			stroke: var(--accent-95);
		}

		@media (prefers-reduced-motion: no-preference) {
			& > .sun {
				transition: transform 0.5s var(--ease-elastic-1);
			}
			& > .sun-beams {
				transition:
					transform 0.5s var(--ease-elastic-2),
					opacity 0.5s var(--ease);
			}
			& .moon > circle {
				transition: transform 0.25s var(--ease-out);
				@supports (cx: 1) {
					transition: cx 0.25s var(--ease-out);
				}
			}
		}
	}

	:global([data-theme='dark']) .darkmode {
		& > .sun {
			transform: scale(1.75);
		}

		& > .sun-beams {
			opacity: 0;
		}
		& > .moon > circle {
			transform: translateX(-7px);

			@supports (cx: 1) {
				cx: 16;
				transform: translateX(0);
			}
		}

		@media (prefers-reduced-motion: no-preference) {
			& > .sun {
				transition-timing-function: var(--ease);
				transition-duration: 0.25s;
				transform: scale(1.75);
			}

			& > .sun-beams {
				transition-duration: 0.15s;
				transform: rotateZ(-25deg);
			}

			& > .moon > circle {
				transition-duration: 0.5s;
				transition-delay: 0.25s;
			}
		}
	}
</style>
