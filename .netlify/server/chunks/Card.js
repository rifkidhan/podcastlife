import { N as attributes, y as attr_class, F as clsx, z as attr } from "./index.js";
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      url,
      id,
      action,
      label,
      thumbnail,
      class: className,
      $$slots,
      $$events,
      ...attrs
    } = $$props;
    $$renderer2.push(`<li${attributes(
      {
        id,
        title: label,
        "aria-label": label,
        class: "container",
        ...attrs
      },
      "svelte-1udyrqm"
    )}><div${attr_class(clsx(["card", className]), "svelte-1udyrqm")}>`);
    if (url) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", url)}${attr("aria-labelledby", id)} draggable="true" class="svelte-1udyrqm"></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (thumbnail) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="thumbnail svelte-1udyrqm">`);
      thumbnail($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="content svelte-1udyrqm">`);
    attrs.children?.($$renderer2);
    $$renderer2.push(`<!----></div> `);
    if (action) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="action svelte-1udyrqm">`);
      action($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></li>`);
  });
}
export {
  Card as C
};
