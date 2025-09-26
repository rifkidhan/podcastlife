import { N as attributes, y as attr_class, F as clsx } from "./index.js";
function RunningText($$renderer, $$props) {
  let {
    textAlign = "left",
    class: className,
    children,
    $$slots,
    $$events,
    ...attrs
  } = $$props;
  let move = /* @__PURE__ */ (() => {
    return false;
  })();
  let calcWidth = /* @__PURE__ */ (() => {
    return 0;
  })();
  $$renderer.push(`<span${attributes({ class: clsx(["running-text", className]), ...attrs }, "svelte-1d9hpek", void 0, {
    "--pl-running-text-length": `-${Math.round(calcWidth + 20)}px`,
    "--pl-running-text-duration": `${Math.floor(calcWidth * 3 / 100 + 3)}s`,
    "--pl-running-text-align": textAlign
  })}><span${attr_class(clsx(["inner", { "running-animation": move }]), "svelte-1d9hpek")}>`);
  children?.($$renderer);
  $$renderer.push(`<!----></span></span>`);
}
export {
  RunningText as R
};
