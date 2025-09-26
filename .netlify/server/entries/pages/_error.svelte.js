import { e as escape_html } from "../../chunks/context.js";
import "clsx";
import { p as page } from "../../chunks/index2.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="error svelte-1j96wlh"><h1 class="text-display svelte-1j96wlh"><span class="status svelte-1j96wlh">${escape_html(page.status)}</span> <span class="message font-lancip svelte-1j96wlh">${escape_html(page.error?.message)}</span></h1></div>`);
  });
}
export {
  _error as default
};
