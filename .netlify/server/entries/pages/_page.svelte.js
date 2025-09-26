import { G as ensure_array_like } from "../../chunks/index.js";
import { C as Carousel } from "../../chunks/Carousel.js";
import { C as Card } from "../../chunks/Card.js";
import { a as Image } from "../../chunks/Image.js";
import { e as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let trendings = data.trendings;
    let recents = data.recents;
    $$renderer2.push(`<h1 class="sr-only">Podcastlife</h1> <section><h2 class="text-lg">Trending on this week</h2> `);
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
                $$renderer4.push(`<div class="author text-sm svelte-1uha8ag">${escape_html(item.author)}</div> <div class="title svelte-1uha8ag">${escape_html(item.title)}</div>`);
              },
              $$slots: { thumbnail: true, default: true }
            });
          }
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!----></section> <section><h2 class="text-lg">Recent update</h2> `);
    Carousel($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(recents);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let item = each_array_1[$$index_1];
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
                $$renderer4.push(`<div class="author text-sm svelte-1uha8ag">${escape_html(item.author)}</div> <div class="title svelte-1uha8ag">${escape_html(item.title)}</div>`);
              },
              $$slots: { thumbnail: true, default: true }
            });
          }
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    $$renderer2.push(`<!----></section>`);
  });
}
export {
  _page as default
};
