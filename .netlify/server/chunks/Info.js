import { Q as props_id, N as attributes, z as attr, K as bind_props } from "./index.js";
import { e as escape_html } from "./context.js";
import { B as Button, I as Icon, a as Image, h as html } from "./Image.js";
import { M as MediaQuery } from "./player.svelte.js";
import { R as RunningText } from "./RunningText.js";
function Modal($$renderer, $$props) {
  const uid = props_id($$renderer);
  let { title, description, children, $$slots, $$events, ...attrs } = $$props;
  let modal = void 0;
  let open = false;
  const openModal = () => {
    modal.showModal();
    open = true;
  };
  $$renderer.push(`<dialog${attributes(
    {
      closedby: "any",
      "aria-labelledby": `${uid}-title`,
      "aria-hidden": !open,
      ...attrs
    },
    "svelte-ta60gp"
  )}><div class="wrapper svelte-ta60gp"><div class="top svelte-ta60gp"><div${attr("id", `${uid}-title`)} class="title text-md font-lancip svelte-ta60gp">${escape_html(title)}</div> <div class="action svelte-ta60gp">`);
  Button($$renderer, {
    size: "square",
    title: "Close",
    onclick: () => {
      modal.close();
      open = false;
    },
    children: ($$renderer2) => {
      Icon($$renderer2, { name: "close", isHidden: true });
      $$renderer2.push(`<!----> <span class="sr-only">Close modal</span>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div></div> <hr/> <div class="content svelte-ta60gp">`);
  children?.($$renderer);
  $$renderer.push(`<!----></div></div></dialog>`);
  bind_props($$props, { openModal });
}
function Info($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      img,
      img_hash,
      title = "Untitled",
      description = "No description",
      author,
      author_link,
      misc,
      action,
      explicit
    } = $$props;
    let descriptionTruncate = /* @__PURE__ */ (() => {
      return false;
    })();
    const smallScreen = new MediaQuery("max-width: 1024px");
    $$renderer2.push(`<div class="info svelte-vtp5x4"><div class="thumbnail svelte-vtp5x4">`);
    Image($$renderer2, {
      src: img,
      alt: title,
      blurdata: img_hash,
      full: true,
      priority: true
    });
    $$renderer2.push(`<!----></div> <div class="header svelte-vtp5x4"><div class="title svelte-vtp5x4"><div class="author text-md svelte-vtp5x4">`);
    if (author_link) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", author_link)} class="svelte-vtp5x4">`);
      if (explicit) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="svelte-vtp5x4">`);
        Icon($$renderer2, {
          name: "explicit",
          stroke: "none",
          "aria-label": "explicit content",
          class: "explicit"
        });
        $$renderer2.push(`<!----></span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <span class="svelte-vtp5x4">${escape_html(author)}</span></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (explicit) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, {
          name: "explicit",
          stroke: "none",
          "aria-label": "explicit content",
          class: "explicit"
        });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> ${escape_html(author)}`);
    }
    $$renderer2.push(`<!--]--></div> <h1 class="text-xl font-lancip svelte-vtp5x4">`);
    RunningText($$renderer2, {
      textAlign: smallScreen.current ? "center" : "left",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(title)}`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></h1></div> `);
    if (misc) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="misc list-with-dot text-sm svelte-vtp5x4">`);
      misc($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="description svelte-vtp5x4"><div class="summary svelte-vtp5x4"${attr("data-truncate", descriptionTruncate)}>${html(description)}</div> `);
    if (descriptionTruncate) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="description-modal-button svelte-vtp5x4">show more</button> `);
      Modal($$renderer2, {
        title,
        children: ($$renderer3) => {
          $$renderer3.push(`${html(description)}`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (action) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="action svelte-vtp5x4">`);
      action($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  Info as I
};
