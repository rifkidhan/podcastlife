import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import aspect from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';

/**
 *
 * @param {string} str
 * @returns string
 */
function addColor(str) {
	return `rgb(var(${str}) / <alpha-value>)`;
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
				lg: '2.5rem',
				xl: '3rem',
				'2xl': '4rem'
			}
		},
		colors: {
			transparent: 'transparent',
			white: addColor('--white'),
			black: addColor('--black'),
			accent: {
				5: addColor('--accent-50'),
				10: addColor('--accent-100'),
				20: addColor('--accent-200'),
				30: addColor('--accent-300'),
				40: addColor('--accent-400'),
				50: addColor('--accent-500'),
				60: addColor('--accent-600'),
				70: addColor('--accent-700'),
				80: addColor('--accent-800'),
				90: addColor('--accent-900'),
				95: addColor('--accent-950')
			},
			picton: {
				DEFAULT: addColor('--picton-blue-500'),
				5: addColor('--picton-blue-50'),
				10: addColor('--picton-blue-100'),
				20: addColor('--picton-blue-200'),
				30: addColor('--picton-blue-300'),
				40: addColor('--picton-blue-400'),
				50: addColor('--picton-blue-500'),
				60: addColor('--picton-blue-600'),
				70: addColor('--picton-blue-700'),
				80: addColor('--picton-blue-800'),
				90: addColor('--picton-blue-900'),
				95: addColor('--picton-blue-950')
			},
			cerise: {
				DEFAULT: addColor('--hollywood-cerise-600'),
				5: addColor('--hollywood-cerise-50'),
				10: addColor('--hollywood-cerise-100'),
				20: addColor('--hollywood-cerise-200'),
				30: addColor('--hollywood-cerise-300'),
				40: addColor('--hollywood-cerise-400'),
				50: addColor('--hollywood-cerise-500'),
				60: addColor('--hollywood-cerise-600'),
				70: addColor('--hollywood-cerise-700'),
				80: addColor('--hollywood-cerise-800'),
				90: addColor('--hollywood-cerise-900'),
				95: addColor('--hollywood-cerise-950')
			},

			chartreuse: {
				DEFAULT: addColor('--golden-fizz-400'),
				5: addColor('--golden-fizz-50'),
				10: addColor('--golden-fizz-100'),
				20: addColor('--golden-fizz-200'),
				30: addColor('--golden-fizz-300'),
				40: addColor('--golden-fizz-400'),
				50: addColor('--golden-fizz-500'),
				60: addColor('--golden-fizz-600'),
				70: addColor('--golden-fizz-700'),
				80: addColor('--golden-fizz-800'),
				90: addColor('--golden-fizz-900'),
				95: addColor('--golden-fizz-950')
			},
			cinnabar: {
				DEFAULT: addColor('--cinnabar-600'),
				5: addColor('--cinnabar-50'),
				10: addColor('--cinnabar-100'),
				20: addColor('--cinnabar-200'),
				30: addColor('--cinnabar-300'),
				40: addColor('--cinnabar-400'),
				50: addColor('--cinnabar-500'),
				60: addColor('--cinnabar-600'),
				70: addColor('--cinnabar-700'),
				80: addColor('--cinnabar-800'),
				90: addColor('--cinnabar-900'),
				95: addColor('--cinnabar-950')
			},
			apple: {
				DEFAULT: addColor('--apple-600'),
				5: addColor('--apple-50'),
				10: addColor('--apple-100'),
				20: addColor('--apple-200'),
				30: addColor('--apple-300'),
				40: addColor('--apple-400'),
				50: addColor('--apple-500'),
				60: addColor('--apple-600'),
				70: addColor('--apple-700'),
				80: addColor('--apple-800'),
				90: addColor('--apple-900'),
				95: addColor('--apple-950')
			}
		},
		corePlugins: {
			aspectRatio: false
		},
		aspectRatio: {
			auto: 'auto',
			square: '1 / 1',
			video: '16 / 9',
			1: '1',
			2: '2',
			3: '3',
			4: '4',
			5: '5',
			6: '6',
			7: '7',
			8: '8',
			9: '9',
			10: '10',
			11: '11',
			12: '12',
			13: '13',
			14: '14',
			15: '15',
			16: '16'
		},
		extend: {
			fontFamily: {
				sans: ['"Plus Jakarta Sans Variable"', ...defaultTheme.fontFamily.sans]
			},
			boxShadow: {
				'drop-sm': '2px 2px 0 0 rgb(var(--accent-950))',
				drop: '5px 5px 0 0 rgb(var(--accent-950))',
				smooth: '0 81px 106px 0 rgb(0 0 0 / 0.12), 0 10px 13px 0 rgb(0 0 0 / 0.5)',
				highlight: 'inset 0 -.5em 0 0 rgb(var(--picton-blue-500))'
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'rgb(var(--accent-950))',
						a: {
							color: 'rgb(var(--accent-950))',
							'&:hover': {
								color: 'rgb(var(--picton-blue-600))'
							},
							code: 'rgb(var(--hollywood-cerise-600))'
						},
						'[class~="lead"]': {
							color: 'rgb(var(--accent-950))'
						},
						'h1, h2, h3, h4, h5, h6': {
							color: 'rgb(var(--accent-950))',
							fontSize: null
						},
						strong: {
							color: 'rgb(var(--accent-950))'
						},
						'ol > li::marker': {
							color: 'rgb(var(--hollywood-cerise-600))'
						},
						'ul > li::marker': {
							color: 'rgb(var(--hollywood-cerise-600))'
						},
						hr: {
							borderColor: 'rgb(var(--accent-950))'
						},
						blockquote: {
							color: 'rgb(var(--accent-700))',
							borderLeftColor: 'rgb(var(--hollywood-cerise-600))'
						},
						figcaption: {
							color: 'rgb(var(--accent-700))'
						},
						img: null,
						pre: null,
						code: null,
						'code::before': null,
						'code::after': null,
						'pre code': null,
						'pre code::before': null,
						'pre code::after': null,
						'thead, tbody tr, tfoot': {
							borderBottomColor: 'rgb(var(--accent-950))'
						},
						'thead th': {
							color: 'rgb(var(--accent-950))'
						}
					}
				}
			}
		}
	},
	plugins: [aspect, typography]
};
