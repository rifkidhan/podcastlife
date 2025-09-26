import { G as ensure_array_like } from "../../../../chunks/index.js";
import { C as Carousel } from "../../../../chunks/Carousel.js";
import { C as Card } from "../../../../chunks/Card.js";
import { a as Image } from "../../../../chunks/Image.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, data } = $$props;
    let trendings = data.trending;
    $$renderer2.push(`<h1 class="text-display">${escape_html(data.meta.title)}</h1> <section><h2 class="text-lg">Trending on this week</h2> `);
    Carousel($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(trendings);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          {
            let thumbnail = function($$renderer4) {
              Image($$renderer4, {
                src: item.image,
                alt: item.title,
                blurdata: item.hash,
                full: true
              });
            };
            Card($$renderer3, {
              id: item.id,
              label: item.title,
              class: "feed",
              url: `/podcast/${item.id}`,
              thumbnail,
              children: ($$renderer4) => {
                $$renderer4.push(`<div class="author text-sm svelte-a56viq">${escape_html(item.author)}</div> <div class="title svelte-a56viq">${escape_html(item.title)}</div>`);
              },
              $$slots: { thumbnail: true, default: true }
            });
          }
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!----></section> `);
    children($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _layout as default
};
