export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Logo_24.svg","Logo_512.svg","apple-touch-icon.png","default-open-graph.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","favicon.svg","icon-192x192.png","icon-512x512.png","icon-maskable-192x192.png","icon-maskable-512x512.png","robots.txt","site.webmanifest"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".txt":"text/plain",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.e2XpPgU9.js",app:"_app/immutable/entry/app.CWLj81xw.js",imports:["_app/immutable/entry/start.e2XpPgU9.js","_app/immutable/chunks/CHf2oe-V.js","_app/immutable/chunks/C2R9s6EJ.js","_app/immutable/chunks/CGOyXo5f.js","_app/immutable/chunks/CbsQOUs-.js","_app/immutable/chunks/D-LR5z_2.js","_app/immutable/entry/app.CWLj81xw.js","_app/immutable/chunks/B_l8N-Qy.js","_app/immutable/chunks/CGOyXo5f.js","_app/immutable/chunks/CbsQOUs-.js","_app/immutable/chunks/NZTpNUN0.js","_app/immutable/chunks/C2R9s6EJ.js","_app/immutable/chunks/D-LR5z_2.js","_app/immutable/chunks/-bkdb_JS.js","_app/immutable/chunks/CQTOL6NN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/live",
				pattern: /^\/live\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/podcast",
				pattern: /^\/podcast\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/podcast/[feedId=integer]",
				pattern: /^\/podcast\/([^/]+?)\/?$/,
				params: [{"name":"feedId","matcher":"integer","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/podcast/[cat=category]",
				pattern: /^\/podcast\/([^/]+?)\/?$/,
				params: [{"name":"cat","matcher":"category","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/podcast/[feedId=integer]/[guid]",
				pattern: /^\/podcast\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"feedId","matcher":"integer","optional":false,"rest":false,"chained":false},{"name":"guid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			const { match: integer } = await import ('./entries/matchers/integer.js')
			const { match: category } = await import ('./entries/matchers/category.js')
			return { integer, category };
		},
		server_assets: {}
	}
}
})();
