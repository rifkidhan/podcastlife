import { G as ensure_array_like, z as attr } from "../../../chunks/index.js";
import { C as CATEGORIES } from "../../../chunks/constants.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer) {
  $$renderer.push(`<h1 class="text-display font-lancip">Podcast</h1> <section class="svelte-1yetzgr"><h2 class="text-lg font-lancip">Categories</h2> <ul class="categories svelte-1yetzgr"><!--[-->`);
  const each_array = ensure_array_like(CATEGORIES);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let cat = each_array[$$index];
    $$renderer.push(`<li class="category svelte-1yetzgr"><a${attr("href", `/podcast/${cat.id}`)} class="svelte-1yetzgr">${escape_html(cat.title)}</a></li>`);
  }
  $$renderer.push(`<!--]--></ul></section>`);
}
export {
  _page as default
};
