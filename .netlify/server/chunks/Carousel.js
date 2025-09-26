import { y as attr_class, F as clsx, z as attr } from "./index.js";
import { B as Button, I as Icon } from "./Image.js";
function Carousel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, class: className } = $$props;
    let prevButtonDisable = true;
    let nextButtonDisable = false;
    let progress = 0;
    const prevOnclick = () => {
    };
    const nextOnclick = () => {
    };
    $$renderer2.push(`<div${attr_class(clsx(["carousel", className]), "svelte-8ojyxu")}><div class="viewport svelte-8ojyxu"><ul class="container svelte-8ojyxu" aria-live="polite">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></ul></div> <div class="controls svelte-8ojyxu"><progress${attr("value", progress)}${attr("max", 1)} class="progress-bar svelte-8ojyxu"></progress> <div class="buttons svelte-8ojyxu">`);
    Button($$renderer2, {
      id: "prev",
      type: "button",
      size: "square",
      title: "Previous slide",
      onclick: prevOnclick,
      disabled: prevButtonDisable,
      children: ($$renderer3) => {
        Icon($$renderer3, { name: "chevron-left", isHidden: true });
        $$renderer3.push(`<!----> <span class="sr-only">previous slide</span>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      id: "next",
      type: "button",
      size: "square",
      title: "Next slide",
      onclick: nextOnclick,
      disabled: nextButtonDisable,
      children: ($$renderer3) => {
        Icon($$renderer3, { name: "chevron-right", isHidden: true });
        $$renderer3.push(`<!----> <span class="sr-only">next slide</span>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></div>`);
  });
}
export {
  Carousel as C
};
