globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as renderers } from './chunks/_@astro-renderers_DaLW5Tpq.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D5l4IyHw.mjs';
import { manifest } from './manifest_C03GcwUo.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/categories/_category_.astro.mjs');
const _page4 = () => import('./pages/categories.astro.mjs');
const _page5 = () => import('./pages/privacy-policy.astro.mjs');
const _page6 = () => import('./pages/terms-of-service.astro.mjs');
const _page7 = () => import('./pages/_lang_/categories/_category_.astro.mjs');
const _page8 = () => import('./pages/_lang_/categories.astro.mjs');
const _page9 = () => import('./pages/_lang_/_slug_.astro.mjs');
const _page10 = () => import('./pages/_lang_.astro.mjs');
const _page11 = () => import('./pages/_slug_.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/@astrojs+cloudflare@12.6.13_@types+node@25.6.0_astro@5.18.1_@types+node@25.6.0_jiti@2.6_ed8ea23c46afba47c3c8b7fe15e2f538/node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/categories/[category].astro", _page3],
    ["src/pages/categories.astro", _page4],
    ["src/pages/privacy-policy.astro", _page5],
    ["src/pages/terms-of-service.astro", _page6],
    ["src/pages/[lang]/categories/[category].astro", _page7],
    ["src/pages/[lang]/categories.astro", _page8],
    ["src/pages/[lang]/[slug].astro", _page9],
    ["src/pages/[lang]/index.astro", _page10],
    ["src/pages/[slug].astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
