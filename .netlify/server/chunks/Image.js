import { N as attributes, F as clsx } from "./index.js";
import { blurhashToCssGradientString } from "@unpic/placeholder";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Button($$renderer, $$props) {
  let {
    children,
    type = "button",
    variant = "primary",
    size = "md",
    disabled,
    class: className,
    $$slots,
    $$events,
    ...attrs
  } = $$props;
  $$renderer.push(`<button${attributes(
    {
      type,
      class: clsx([variant, size, className]),
      disabled,
      ...attrs
    },
    "svelte-18sv61c"
  )}>`);
  children?.($$renderer);
  $$renderer.push(`<!----></button>`);
}
const ICONS = {
  computer: '<rect width="14" height="8" x="5" y="2" rx="2"></rect><rect	width="20" height="8" x="2"	y="14" rx="2"></rect><path d="M6 18h2"></path><path d="M12 18h6"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path	d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>',
  menu: '<line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />',
  close: '<path d="M18 6 6 18" /><path d="m6 6 12 12" />',
  "chevron-left": '<path d="m15 18-6-6 6-6" />',
  "chevron-right": '<path d="m9 18 6-6-6-6" />',
  "chevron-up": '<path d="m18 15-6-6-6 6" />',
  "chevron-down": '<path d="m6 9 6 6 6-6" />',
  "image-off": '<line x1="2" x2="22" y1="2" y2="22" /><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" /><line x1="13.5" x2="6" y1="13.5" y2="21" /><line x1="18" x2="21" y1="12" y2="15" /><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" /><path d="M21 15V5a2 2 0 0 0-2-2H9" />',
  play: '<polygon points="6 3 20 12 6 21 6 3" />',
  pause: '<rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" />',
  "move-up": '<path d="M8 6L12 2L16 6" /><path d="M12 2V22" />',
  explicit: '<path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z"/>',
  next: '<path d="M18 8L22 12L18 16"/><path d="M2 12H22"/>',
  prev: '<path d="M6 8L2 12L6 16"/><path d="M2 12H22"/>',
  plus: '<path d="M5 12h14" /><path class="rotate" d="M12 5v14" />',
  "external-link": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  options: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  "chevrons-right": '<path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/>',
  "chevrons-left": '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>',
  "skip-backward": '<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',
  "skip-forward": '<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',
  volume: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>',
  "volume-full": '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
  spinner: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  podcastlife: '<circle cx="12" cy="12" r="12" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12Z" fill="#fafafa" />'
};
function Icon($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      name,
      stroke = "currentColor",
      fill = "none",
      size = 24,
      isHidden,
      $$slots,
      $$events,
      ...attrs
    } = $$props;
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill,
        stroke,
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "aria-hidden": isHidden,
        ...attrs
      },
      void 0,
      void 0,
      void 0,
      3
    )}>${html(ICONS[name])}</svg>`);
  });
}
function Image($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      src,
      alt,
      priority = false,
      blurdata,
      full,
      class: className,
      $$slots,
      $$events,
      ...attrs
    } = $$props;
    let imgSrc = /* @__PURE__ */ (() => {
      let imgSrc2 = src;
      return imgSrc2;
    })();
    let blur = blurdata && true ? blurhashToCssGradientString(blurdata, 4, 4) : "linear-gradient(to bottom, var(--pl-accent-2) 20%, var(--pl-accent-2) 100%)";
    $$renderer2.push(`<img${attributes(
      {
        loading: priority ? "eager" : "lazy",
        decoding: "async",
        fetchpriority: priority ? "high" : "auto",
        src: imgSrc,
        alt,
        class: clsx([className, { full }]),
        ...attrs
      },
      void 0,
      void 0,
      {
        "background-image": blur,
        "background-size": "cover",
        "background-repeat": "no-repeat"
      }
    )} onerror="this.__e=event" onload="this.__e=event"/>`);
  });
}
export {
  Button as B,
  Icon as I,
  Image as a,
  html as h
};
