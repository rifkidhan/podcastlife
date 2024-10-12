import node from '@astrojs/node';
import solidJs from '@astrojs/solid-js';
import { defineConfig, envField } from 'astro/config';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
	site: 'https://podcastlife.koyeb.app',
	integrations: [solidJs()],
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	vite: {
		css: {
			transformer: 'lightningcss',
			lightningcss: {
				targets: browserslistToTargets(browserslist(['>0.25%', 'not dead']))
			}
		},
		build: {
			cssMinify: 'lightningcss'
		}
	},
	scopedStyleStrategy: 'where',
	prefetch: {
		defaultStrategy: 'tap'
	},
	redirects: {
		'/podcast': {
			status: 302,
			destination: '/categories'
		}
	},
	experimental: {
		env: {
			schema: {
				API_URL: envField.string({ context: 'server', access: 'secret' }),
				API_TOKEN: envField.string({ context: 'server', access: 'secret' }),
				ORIGIN: envField.string({ context: 'client', access: 'public' })
			}
		},
		serverIslands: true
	}
});
