import { G as ensure_array_like, z as attr } from "../../../../chunks/index.js";
import { p as page, g as goto } from "../../../../chunks/index2.js";
import { C as Card } from "../../../../chunks/Card.js";
import { I as Icon, h as html, B as Button, a as Image } from "../../../../chunks/Image.js";
import { g as getTime } from "../../../../chunks/time.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, params } = $$props;
    let categories = data.category;
    let meta = data.info;
    let paginate = (() => {
      const pageNow = page.url.searchParams.get("page");
      if (typeof pageNow === "string") {
        return Number(pageNow);
      }
      return 1;
    })();
    const previousPage = () => {
      const base = `/podcast/${params.cat}`;
      const search = new URLSearchParams();
      if (paginate > 1) {
        search.set("page", `${paginate - 1}`);
        search.set("c", meta.cursor);
        search.set("back", "true");
      }
      base + `${paginate > 2 ? "?" + search.toString() : ""}`;
      goto();
    };
    const nextPage = () => {
      const base = `/podcast/${params.cat}`;
      const search = new URLSearchParams();
      if (meta.more) {
        search.set("page", `${paginate + 1}`);
        search.set("c", meta.cursor);
      }
      base + `${meta.more ? "?" + search.toString() : ""}`;
      goto();
    };
    $$renderer2.push(`<section><ul class="categories svelte-uubv55"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      {
        let thumbnail = function($$renderer3) {
          Image($$renderer3, {
            src: item.image,
            alt: item.title ?? "untitled",
            blurdata: item.hash,
            full: true
          });
        };
        Card($$renderer2, {
          thumbnail,
          children: ($$renderer3) => {
            $$renderer3.push(`<div class="time text-sm list-with-dot">`);
            if (item.newestItemPubdate) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<span>${escape_html(getTime(item.newestItemPubdate))}</span>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--></div> <h3 class="cat-title font-lancip svelte-uubv55"><a${attr("href", `/podcast/${item.id}`)} class="svelte-uubv55"><span class="svelte-uubv55">`);
            if (item.explicit) {
              $$renderer3.push("<!--[-->");
              Icon($$renderer3, {
                name: "explicit",
                stroke: "none",
                "aria-label": "explicit content",
                class: "explicit"
              });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> ${escape_html(item.title)}</span></a></h3> <div class="summary text-sm svelte-uubv55">${html(item.description)}</div>`);
          },
          $$slots: { thumbnail: true, default: true }
        });
      }
    }
    $$renderer2.push(`<!--]--> <div class="page-control svelte-uubv55">`);
    Button($$renderer2, {
      variant: "theme",
      title: "Previous page",
      onclick: () => previousPage(),
      disabled: paginate <= 1,
      children: ($$renderer3) => {
        Icon($$renderer3, { name: "chevron-left", isHidden: true });
        $$renderer3.push(`<!----> <span>Prev</span>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "theme",
      title: "Next page",
      onclick: () => nextPage(),
      disabled: !meta.more,
      children: ($$renderer3) => {
        Icon($$renderer3, { name: "chevron-right", isHidden: true });
        $$renderer3.push(`<!----> <span>Next</span>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></ul></section>`);
  });
}
export {
  _page as default
};
