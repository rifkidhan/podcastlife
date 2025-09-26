import { x as derived, y as attr_class, z as attr, F as clsx, G as ensure_array_like, J as attr_style, K as bind_props, N as attributes, O as stringify, P as head } from "../../chunks/index.js";
import { p as page, a as pushState, n as navigating } from "../../chunks/index2.js";
import { a as assets, b as base } from "../../chunks/server.js";
import { r as resolve_route } from "../../chunks/routing.js";
import { try_get_request_store } from "@sveltejs/kit/internal/server";
import { T as TITLE_SITE, C as CATEGORIES, D as DESCRIPTION_SITE } from "../../chunks/constants.js";
import { P as Persisted, M as MediaQuery, a as audiometadata } from "../../chunks/player.svelte.js";
import "clsx";
import { B as Button, I as Icon, a as Image } from "../../chunks/Image.js";
import { e as escape_html, s as setContext, g as getContext } from "../../chunks/context.js";
import { f as formatTime } from "../../chunks/time.js";
import { L as Livesign } from "../../chunks/Livesign.js";
import { R as RunningText } from "../../chunks/RunningText.js";
async function tick() {
}
function asset(file) {
  return assets ? assets + file : resolve(file);
}
function resolve(id, params) {
  const resolved = resolve_route(
    id,
    /** @type {Record<string, string>} */
    params
  );
  {
    const store = try_get_request_store();
    if (store && !store.state.prerendering?.fallback) {
      const segments = store.event.url.pathname.slice(base.length).split("/").slice(2);
      const prefix = segments.map(() => "..").join("/") || ".";
      return prefix + resolved;
    }
  }
  return base + resolved;
}
class Theme {
  #preference = new Persisted("podcastlife:theme", "auto");
  #query = new MediaQuery("prefers-color-scheme: dark");
  #system = derived(() => this.#query.current ? "dark" : "light");
  get current() {
    return this.#preference.current === "auto" ? this.#system() : this.#preference.current;
  }
  set current(v) {
    this.#preference.current = v === this.#system() ? "auto" : v;
  }
}
const theme = new Theme();
class UIState {
  #menu = false;
  get menuOpen() {
    return this.#menu;
  }
  set menuOpen(value) {
    this.#menu = value;
  }
  get playerShown() {
    return audiometadata.track.enclosure !== "";
  }
  get inert() {
    return this.#menu || page.state.fullPlayer;
  }
}
const useUI = new UIState();
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<header${attr_class(clsx(["pl-header", { invisible: false }]), "svelte-1elxaub")}${attr("inert", useUI.inert, true)}><div class="wrapper svelte-1elxaub"><a href="/" class="home font-lancip svelte-1elxaub" title="Home">${escape_html(TITLE_SITE)}</a> `);
    Button($$renderer2, {
      size: "square",
      "aria-controls": "side-navigation",
      "aria-expanded": useUI.menuOpen,
      onclick: () => useUI.menuOpen = true,
      title: "Open navigation",
      children: ($$renderer3) => {
        Icon($$renderer3, { name: "menu", isHidden: true });
        $$renderer3.push(`<!----> <span class="sr-only">open navigation</span>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></header>`);
  });
}
function ThemeSwitch($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<button class="theme-switch svelte-mls84d" type="button" role="switch" title="Toggle theme"${attr("value", theme.current)} aria-live="polite"${attr("aria-checked", theme.current === "dark")} aria-label="Toggle theme"><span class="theme-icon svelte-mls84d" aria-hidden="true"${attr("data-selected", theme.current === "light")}>`);
    if (theme.current === "light") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="selected svelte-mls84d"></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Icon($$renderer2, { name: "sun", isHidden: true });
    $$renderer2.push(`<!----></span> <span class="theme-icon svelte-mls84d" aria-hidden="true"${attr("data-selected", theme.current === "dark")}>`);
    if (theme.current === "dark") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="selected svelte-mls84d"></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Icon($$renderer2, { name: "moon", isHidden: true });
    $$renderer2.push(`<!----></span></button>`);
  });
}
function Sidenav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const NAVIGATIONS = [
      { href: "/", title: "Home" },
      { href: "/podcast", title: "Podcast" },
      { href: "/podcast", title: "Categories" },
      { href: "/live", title: "Live Podcast" },
      { href: "/about", title: "About" }
    ];
    function listItem($$renderer3, href, title) {
      $$renderer3.push(`<li class="svelte-m5fahc"><a${attr("href", href)} class="svelte-m5fahc"><span class="svelte-m5fahc">${escape_html(title)}</span></a></li>`);
    }
    $$renderer2.push(`<div class="drawer svelte-m5fahc" role="dialog"${attr("inert", !useUI.menuOpen, true)}><div class="backdrop svelte-m5fahc" tabindex="-1" aria-hidden="true" inert></div> <nav id="side-navigation" class="svelte-m5fahc"><div class="top svelte-m5fahc">`);
    ThemeSwitch($$renderer2);
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      size: "square",
      "aria-controls": "side-navigation",
      onclick: () => useUI.menuOpen = false,
      children: ($$renderer3) => {
        Icon($$renderer3, { name: "close", isHidden: true });
        $$renderer3.push(`<!----> <span class="sr-only">close navigation</span>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <hr/> <ul class="navigation svelte-m5fahc"><!--[-->`);
    const each_array = ensure_array_like(NAVIGATIONS);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let nav = each_array[$$index_1];
      if (nav.title === "Categories") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<li class="svelte-m5fahc"><details class="svelte-m5fahc"><summary class="svelte-m5fahc">${escape_html(nav.title)} <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="sign svelte-m5fahc"><path d="M5 12h14"></path><path class="rotate svelte-m5fahc" d="M12 5v14"></path></svg></span></summary> <ul class="sub svelte-m5fahc"><!--[-->`);
        const each_array_1 = ensure_array_like(CATEGORIES);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let cat = each_array_1[$$index];
          listItem($$renderer2, `${nav.href}/${cat.id}`, cat.title);
        }
        $$renderer2.push(`<!--]--></ul></details></li>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<li class="svelte-m5fahc">`);
        listItem($$renderer2, nav.href, nav.title);
        $$renderer2.push(`<!----></li>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></ul></nav></div>`);
  });
}
function Slider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      min = 0,
      max = 100,
      step = 1,
      value = void 0,
      useSlider,
      class: className
    } = $$props;
    if (useSlider) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<input type="range"${attr("value", value)}${attr("max", max)}${attr("min", min)}${attr("step", step)}${attr_class(clsx(className), "svelte-oyl6e3")}${attr_style("", { "--pl-slider-value": `${value * 100 / max}%` })}/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<progress${attr("max", max)}${attr("value", value)} aria-live="polite"${attr_class(clsx(className), "svelte-oyl6e3")}></progress>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { value });
  });
}
function Player($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let track = audiometadata.track;
    const largeScreen = new MediaQuery("min-width: 768px");
    let useSlider = largeScreen.current && Number.isFinite(audiometadata.duration);
    const openFullPlayer = () => {
      pushState();
    };
    let $$settled2 = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="player svelte-1abixwz"${attr("inert", useUI.inert, true)}><!---->`);
      {
        $$renderer3.push(`<div class="seeker">`);
        Slider($$renderer3, {
          useSlider,
          min: 0,
          max: Number.isFinite(audiometadata.duration) && audiometadata.readyState > 0 ? audiometadata.duration : 1,
          get value() {
            return audiometadata.currentTime;
          },
          set value($$value) {
            audiometadata.currentTime = $$value;
            $$settled2 = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="wrapper svelte-1abixwz"><div class="controls svelte-1abixwz"><span class="backward svelte-1abixwz">`);
        Button($$renderer3, {
          variant: "theme",
          size: "square",
          title: "Backward 15 seconds",
          onclick: () => audiometadata.currentTime = audiometadata.currentTime -= 15,
          children: ($$renderer4) => {
            Icon($$renderer4, { name: "skip-backward", isHidden: true });
            $$renderer4.push(`<!----> <span class="sr-only">skip 15 second backward</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></span> <span>`);
        Button($$renderer3, {
          size: "square",
          title: audiometadata.paused ? "Play" : "Pause",
          "aria-pressed": !audiometadata.paused,
          onclick: () => audiometadata.paused = !audiometadata.paused,
          children: ($$renderer4) => {
            if (audiometadata.state === "loading") {
              $$renderer4.push("<!--[-->");
              Icon($$renderer4, { name: "spinner", isHidden: true, class: "animate-spin" });
            } else {
              $$renderer4.push("<!--[!-->");
              if (audiometadata.state === "play") {
                $$renderer4.push("<!--[-->");
                Icon($$renderer4, { name: "pause", isHidden: true });
              } else {
                $$renderer4.push("<!--[!-->");
                Icon($$renderer4, { name: "play", isHidden: true });
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]--> <span class="sr-only">toggle play and pause</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></span> <span class="forward svelte-1abixwz">`);
        Button($$renderer3, {
          variant: "theme",
          size: "square",
          title: "Forward 15 seconds",
          onclick: () => audiometadata.currentTime = audiometadata.currentTime += 15,
          children: ($$renderer4) => {
            Icon($$renderer4, { name: "skip-forward", isHidden: true });
            $$renderer4.push(`<!----> <span class="sr-only">skip 15 second forward</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></span></div> <div class="duration text-sm svelte-1abixwz">`);
        if (audiometadata.readyState === 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span>--:--</span> <span>/</span> <span>--:--</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (!Number.isFinite(audiometadata.duration)) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span>`);
            Livesign($$renderer3);
            $$renderer3.push(`<!----> <span>Live</span></span>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<span>${escape_html(formatTime(audiometadata.currentTime))}</span> <span>/</span> <span>${escape_html(formatTime(audiometadata.duration))}</span>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div> <div class="metadata svelte-1abixwz"><div class="thumbnail svelte-1abixwz">`);
        Image($$renderer3, { src: track.image, alt: track.title, full: true });
        $$renderer3.push(`<!----></div> <div class="title text-sm svelte-1abixwz"><div class="running">`);
        RunningText($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(track.title)}`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div> <a${attr("href", `/podcast/${track.feedId}`)} class="feed svelte-1abixwz">`);
        if (track.explicit) {
          $$renderer3.push("<!--[-->");
          Icon($$renderer3, {
            name: "explicit",
            "aria-label": "explicit content",
            class: "explicit",
            stroke: "none",
            size: 18
          });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <span class="svelte-1abixwz">${escape_html(track.feed)}</span></a></div></div> <div class="misc svelte-1abixwz">`);
        Button($$renderer3, {
          size: "square",
          title: "Full player",
          onclick: openFullPlayer,
          children: ($$renderer4) => {
            Icon($$renderer4, { name: "chevron-up", isHidden: true });
            $$renderer4.push(`<!----> <span class="sr-only">open full player</span>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></div> <audio${attr("src", track.enclosure)} preload="metadata"${attr("title", track.title)}></audio>`);
      }
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled2 = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled2);
    $$renderer2.subsume($$inner_renderer);
  });
}
function LoadingIndicator($$renderer) {
  $$renderer.push(`<div class="loading-indicator svelte-sm1v5r">`);
  Icon($$renderer, { name: "podcastlife", "aria-hidden": "true", stroke: "none" });
  $$renderer.push(`<!----></div>`);
}
const DEFAULT_SCROLL_OPTIONS = {
  smoothScroll: true,
  shouldThrowOnBounds: true,
  align: "auto"
};
const calculateVisibleRange = (scrollTop, viewportHeight, itemHeight, totalItems, bufferSize, mode, atBottom, wasAtBottomBeforeHeightChange, lastVisibleRange, totalContentHeight, heightCache) => {
  if (mode === "bottomToTop") {
    const visibleCount = Math.ceil(viewportHeight / itemHeight) + 1;
    const totalHeight = totalContentHeight ?? totalItems * itemHeight;
    const maxScrollTop = Math.max(0, totalHeight - viewportHeight);
    const distanceFromStart = maxScrollTop - scrollTop;
    const startIndex = Math.floor(distanceFromStart / itemHeight);
    if (startIndex < 0) {
      const start2 = 0;
      const end2 = Math.min(totalItems, visibleCount + bufferSize * 2);
      return { start: start2, end: end2 };
    }
    const start = Math.max(0, startIndex - bufferSize);
    const end = Math.min(totalItems, startIndex + visibleCount + bufferSize);
    return { start, end };
  } else {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(totalItems, start + Math.ceil(viewportHeight / itemHeight) + 1);
    const totalHeight = totalContentHeight ?? totalItems * itemHeight;
    const maxScrollTop = Math.max(0, totalHeight - viewportHeight);
    const tolerance = Math.max(1, Math.floor(itemHeight * 0.25));
    const isAtBottom = Math.abs(scrollTop - maxScrollTop) <= tolerance;
    if (isAtBottom) {
      const adjustedEnd = totalItems;
      let startCore = adjustedEnd;
      let acc = 0;
      const getH = (i) => {
        const v = heightCache ? heightCache[i] : void 0;
        return Number.isFinite(v) && v > 0 ? v : itemHeight;
      };
      while (startCore > 0 && acc < viewportHeight) {
        const h = getH(startCore - 1);
        acc += h;
        startCore -= 1;
      }
      return {
        start: Math.max(0, startCore - bufferSize),
        end: adjustedEnd
      };
    }
    const finalStart = Math.max(0, start - bufferSize);
    const finalEnd = Math.min(totalItems, end + bufferSize);
    return {
      start: finalStart,
      end: finalEnd
    };
  }
};
const calculateTransformY = (mode, totalItems, visibleEnd, visibleStart, itemHeight, viewportHeight, totalContentHeight, heightCache, measuredFallbackHeight) => {
  const effectiveViewport = viewportHeight;
  if (mode === "bottomToTop") {
    const actualTotalHeight = totalContentHeight ?? totalItems * itemHeight;
    const basicTransform = (totalItems - visibleEnd) * itemHeight;
    const bottomOffset = Math.max(0, effectiveViewport - actualTotalHeight);
    return basicTransform + bottomOffset;
  } else {
    if (heightCache) {
      const offset = getScrollOffsetForIndex(heightCache, itemHeight, visibleStart);
      return Math.max(0, Math.round(offset));
    }
    return visibleStart * itemHeight;
  }
};
const getScrollOffsetForIndex = (heightCache, calculatedItemHeight, idx, blockSums, blockSize = 1e3) => {
  const safeIdx = Math.max(0, Math.floor(idx));
  if (safeIdx <= 0)
    return 0;
  {
    let offset = 0;
    for (let i = 0; i < safeIdx; i++) {
      const raw = heightCache[i];
      const height = Number.isFinite(raw) && raw > 0 ? raw : calculatedItemHeight;
      offset += height;
    }
    return offset;
  }
};
function shouldShowDebugInfo(prevRange, currentRange, prevHeight, currentHeight) {
  return true;
}
function createDebugInfo(visibleRange, totalItems, processedItems, averageItemHeight, scrollTop, viewportHeight, totalHeight) {
  const atTop = scrollTop <= 1;
  const atBottom = scrollTop >= totalHeight - viewportHeight - 1;
  return {
    visibleItemsCount: visibleRange.end - visibleRange.start,
    startIndex: visibleRange.start,
    endIndex: visibleRange.end,
    totalItems,
    processedItems,
    // Number of items with measured heights in heightCache
    averageItemHeight,
    atTop,
    atBottom,
    totalHeight
  };
}
const calculateScrollTarget = (params) => {
  const { mode, align, targetIndex, itemsLength, calculatedItemHeight, height, scrollTop, firstVisibleIndex, lastVisibleIndex, heightCache } = params;
  if (mode === "bottomToTop") {
    return calculateBottomToTopScrollTarget({
      align,
      targetIndex,
      itemsLength,
      calculatedItemHeight,
      height,
      scrollTop,
      firstVisibleIndex,
      lastVisibleIndex,
      heightCache
    });
  } else {
    return calculateTopToBottomScrollTarget({
      align,
      targetIndex,
      calculatedItemHeight,
      height,
      scrollTop,
      firstVisibleIndex,
      lastVisibleIndex,
      heightCache
    });
  }
};
const calculateBottomToTopScrollTarget = (params) => {
  const { align, targetIndex, itemsLength, calculatedItemHeight, height, scrollTop, firstVisibleIndex, lastVisibleIndex, heightCache } = params;
  const totalHeight = getScrollOffsetForIndex(heightCache, calculatedItemHeight, itemsLength);
  const itemOffset = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex);
  const itemHeight = calculatedItemHeight;
  if (align === "auto") {
    if (targetIndex < firstVisibleIndex) {
      return Math.max(0, totalHeight - (itemOffset + itemHeight));
    } else if (targetIndex > lastVisibleIndex - 1) {
      return Math.max(0, totalHeight - itemOffset - height);
    } else {
      const itemTop = totalHeight - (itemOffset + itemHeight);
      const itemBottom = totalHeight - itemOffset;
      const distanceToTop = Math.abs(scrollTop - itemTop);
      const distanceToBottom = Math.abs(scrollTop + height - itemBottom);
      return distanceToTop < distanceToBottom ? itemTop : Math.max(0, itemBottom - height);
    }
  } else if (align === "top") {
    return Math.max(0, totalHeight - (itemOffset + itemHeight));
  } else if (align === "bottom") {
    return Math.max(0, totalHeight - itemOffset - height);
  } else if (align === "nearest") {
    const itemTop = totalHeight - (itemOffset + itemHeight);
    const itemBottom = totalHeight - itemOffset;
    if (itemBottom <= scrollTop || itemTop >= scrollTop + height) {
      const distanceToTop = Math.abs(scrollTop - itemTop);
      const distanceToBottom = Math.abs(scrollTop + height - itemBottom);
      return distanceToTop < distanceToBottom ? itemTop : Math.max(0, itemBottom - height);
    } else {
      return null;
    }
  }
  return null;
};
const calculateTopToBottomScrollTarget = (params) => {
  const { align, targetIndex, calculatedItemHeight, height, scrollTop, firstVisibleIndex, lastVisibleIndex, heightCache } = params;
  if (align === "auto") {
    if (targetIndex < firstVisibleIndex) {
      const scrollTarget = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex);
      return scrollTarget;
    } else if (targetIndex > lastVisibleIndex - 1) {
      const itemBottom = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex + 1);
      const scrollTarget = Math.max(0, itemBottom - height);
      return scrollTarget;
    } else {
      const itemTop = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex);
      const itemBottom = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex + 1);
      const distanceToTop = Math.abs(scrollTop - itemTop);
      const distanceToBottom = Math.abs(scrollTop + height - itemBottom);
      if (distanceToTop < distanceToBottom) {
        return itemTop;
      } else {
        return Math.max(0, itemBottom - height);
      }
    }
  } else if (align === "top") {
    const scrollTarget = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex);
    return scrollTarget;
  } else if (align === "bottom") {
    const itemBottom = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex + 1);
    return Math.max(0, itemBottom - height);
  } else if (align === "nearest") {
    const itemTop = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex);
    const itemBottom = getScrollOffsetForIndex(heightCache, calculatedItemHeight, targetIndex + 1);
    if (itemBottom <= scrollTop || itemTop >= scrollTop + height) {
      const distanceToTop = Math.abs(scrollTop - itemTop);
      const distanceToBottom = Math.abs(scrollTop + height - itemBottom);
      if (distanceToTop < distanceToBottom) {
        return itemTop;
      } else {
        return Math.max(0, itemBottom - height);
      }
    } else {
      return null;
    }
  }
  return null;
};
const timeProvider = {
  now: () => {
    if (typeof performance !== "undefined" && performance.now) {
      return performance.now();
    }
    return Date.now();
  }
};
const createAdvancedThrottledCallback = (callback, delay, options = {}) => {
  const { leading = true, trailing = false } = options;
  let lastExecutionTime = 0;
  let trailingTimeoutId = null;
  let lastArgs = null;
  let isFirstCall = true;
  const execute = (args) => {
    lastExecutionTime = timeProvider.now();
    callback(...args);
  };
  return (...args) => {
    const now = timeProvider.now();
    const timeSinceLastExecution = isFirstCall ? delay : now - lastExecutionTime;
    lastArgs = args;
    if (trailingTimeoutId) {
      clearTimeout(trailingTimeoutId);
      trailingTimeoutId = null;
    }
    if (timeSinceLastExecution >= delay) {
      if (leading) {
        isFirstCall = false;
        execute(args);
      }
      if (trailing && !leading) {
        trailingTimeoutId = setTimeout(() => {
          if (lastArgs) {
            execute(lastArgs);
          }
          trailingTimeoutId = null;
        }, delay);
      }
    } else {
      if (isFirstCall && leading) {
        isFirstCall = false;
        execute(args);
      } else if (trailing) {
        const remainingTime = delay - timeSinceLastExecution;
        trailingTimeoutId = setTimeout(() => {
          if (lastArgs) {
            execute(lastArgs);
          }
          trailingTimeoutId = null;
        }, remainingTime);
      }
    }
  };
};
function SvelteVirtualList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const INTERNAL_DEBUG = Boolean(typeof process !== "undefined" && (process?.env?.PUBLIC_SVELTE_VIRTUAL_LIST_DEBUG === "true" || process?.env?.SVELTE_VIRTUAL_LIST_DEBUG === "true"));
    const {
      items = [],
      // Array of items to be rendered in the virtual list
      defaultEstimatedItemHeight = 40,
      // Initial height estimate for items before measurement
      debug = false,
      // Enable debug logging
      renderItem,
      // Function to render each item
      containerClass,
      // Custom class for the container element
      viewportClass,
      // Custom class for the viewport element
      contentClass,
      // Custom class for the content wrapper
      itemsClass,
      // Custom class for the items wrapper
      debugFunction,
      // Custom debug logging function
      mode = "topToBottom",
      // Scroll direction mode
      bufferSize = 20,
      // Number of items to render outside visible area
      testId
      // Base test ID for component elements (undefined = no data-testid attributes)
    } = $$props;
    let height = 0;
    let prevVisibleRange = null;
    let prevHeight = 0;
    const heightManager = new ReactiveListManager({
      itemLength: items.length,
      itemHeight: defaultEstimatedItemHeight,
      internalDebug: INTERNAL_DEBUG
    });
    const displayItems = () => {
      const visibleRange = visibleItems();
      const slice = mode === "bottomToTop" ? items.slice(visibleRange.start, visibleRange.end).reverse() : items.slice(visibleRange.start, visibleRange.end);
      return slice.map((item, sliceIndex) => ({
        item,
        originalIndex: mode === "bottomToTop" ? visibleRange.end - 1 - sliceIndex : visibleRange.start + sliceIndex,
        sliceIndex
      }));
    };
    createAdvancedThrottledCallback(
      () => {
      },
      16,
      {
        leading: true,
        // Execute immediately for responsiveness
        trailing: true
        // CRUCIAL: Execute the last call after delay to ensure measurement always happens
      }
    );
    const totalHeight = () => heightManager.totalHeight;
    const atBottom = heightManager.scrollTop >= totalHeight() - height - 1;
    let wasAtBottomBeforeHeightChange = false;
    let lastVisibleRange = null;
    const visibleItems = () => {
      if (!items.length) return { start: 0, end: 0 };
      const viewportHeight = 0;
      if (mode === "bottomToTop" && !heightManager.initialized && heightManager.scrollTop === 0 && viewportHeight > 0) ;
      lastVisibleRange = calculateVisibleRange(heightManager.scrollTop, viewportHeight, heightManager.averageHeight, items.length, bufferSize, mode, atBottom, wasAtBottomBeforeHeightChange, lastVisibleRange, totalHeight(), heightManager.getHeightCache());
      return lastVisibleRange;
    };
    const scrollToIndex = (index, smoothScroll = true, shouldThrowOnBounds = true) => {
      console.warn("SvelteVirtualList: scrollToIndex is deprecated and will be removed in a future version. Use the new scroll method from the component instance instead.");
      scroll({ index, smoothScroll, shouldThrowOnBounds });
    };
    const scroll = async (options) => {
      const { index, smoothScroll, shouldThrowOnBounds, align } = { ...DEFAULT_SCROLL_OPTIONS, ...options };
      if (!items.length) return;
      if (!heightManager.viewportElement) {
        tick().then(() => {
          if (!heightManager.viewportElement) return;
          scroll({ index, smoothScroll, shouldThrowOnBounds, align });
        });
        return;
      }
      let targetIndex = index;
      if (targetIndex < 0 || targetIndex >= items.length) {
        if (shouldThrowOnBounds) {
          throw new Error(`scroll: index ${targetIndex} is out of bounds (0-${items.length - 1})`);
        } else {
          targetIndex = Math.max(0, Math.min(targetIndex, items.length - 1));
        }
      }
      const { start: firstVisibleIndex, end: lastVisibleIndex } = visibleItems();
      const scrollTarget = calculateScrollTarget({
        mode,
        align: align || "auto",
        targetIndex,
        itemsLength: items.length,
        calculatedItemHeight: heightManager.averageHeight,
        // Use dynamic average from ReactiveListManager
        height,
        scrollTop: heightManager.scrollTop,
        firstVisibleIndex,
        lastVisibleIndex,
        heightCache: heightManager.getHeightCache()
      });
      if (scrollTarget === null) {
        return;
      }
      if (INTERNAL_DEBUG && heightManager.viewportElement) {
        const domMax = Math.max(0, heightManager.viewport.scrollHeight - heightManager.viewport.clientHeight);
        console.info("[SVL] scroll-intent", {
          targetIndex,
          align: align || "auto",
          firstVisibleIndex,
          lastVisibleIndex,
          currentScrollTop: heightManager.scrollTop,
          scrollTarget,
          domMaxScrollTop: domMax
        });
      }
      if (mode === "bottomToTop" && smoothScroll) {
        const visibleElements = heightManager.viewport.querySelectorAll("[data-original-index]");
        let maxIndex = -1;
        let maxElement = null;
        for (const el of visibleElements) {
          const index2 = parseInt(el.getAttribute("data-original-index") || "-1");
          if (index2 > maxIndex) {
            maxIndex = index2;
            maxElement = el;
          }
        }
        maxElement?.scrollIntoView({ behavior: "smooth" });
        await tick();
        await new Promise((resolve2) => setTimeout(resolve2, 100));
        await tick();
      }
      heightManager.viewport.scrollTo({
        top: scrollTarget,
        behavior: smoothScroll ? "smooth" : "auto"
      });
      requestAnimationFrame(() => {
        heightManager.scrollTop = scrollTarget;
        if (INTERNAL_DEBUG && heightManager.viewportElement) {
          const domMax = Math.max(0, heightManager.viewport.scrollHeight - heightManager.viewport.clientHeight);
          console.info("[SVL] scroll-after-call", { scrollTop: heightManager.scrollTop, domMaxScrollTop: domMax });
        }
      });
      setTimeout(
        () => {
        },
        smoothScroll ? 500 : 100
      );
    };
    $$renderer2.push(`<div${attributes(
      {
        id: "virtual-list-container",
        ...testId ? { "data-testid": `${testId}-container` } : {},
        class: clsx(containerClass ?? "virtual-list-container")
      },
      "svelte-plopdb"
    )}><div${attributes(
      {
        id: "virtual-list-viewport",
        ...testId ? { "data-testid": `${testId}-viewport` } : {},
        class: clsx(viewportClass ?? "virtual-list-viewport")
      },
      "svelte-plopdb"
    )}><div${attributes(
      {
        id: "virtual-list-content",
        ...testId ? { "data-testid": `${testId}-content` } : {},
        class: clsx(contentClass ?? "virtual-list-content")
      },
      "svelte-plopdb",
      void 0,
      {
        height: `${stringify((() => Math.max(height, totalHeight()))())}px`
      }
    )}><div${attributes(
      {
        id: "virtual-list-items",
        ...testId ? { "data-testid": `${testId}-items` } : {},
        class: clsx(itemsClass ?? "virtual-list-items")
      },
      "svelte-plopdb",
      void 0,
      {
        visibility: mode === "bottomToTop" ? "hidden" : "visible",
        transform: `translateY(${stringify((() => {
          const visibleRange = visibleItems();
          const effectiveHeight = 400;
          const transform = Math.round(calculateTransformY(mode, items.length, visibleRange.end, visibleRange.start, heightManager.averageHeight, effectiveHeight, totalHeight(), heightManager.getHeightCache()));
          return transform;
        })())}px)`
      }
    )}><!--[-->`);
    const each_array = ensure_array_like(displayItems());
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let currentItemWithIndex = each_array[i];
      if (debug && i === 0 && shouldShowDebugInfo(prevVisibleRange, visibleItems(), prevHeight, heightManager.averageHeight)) {
        $$renderer2.push("<!--[-->");
        const debugInfo = createDebugInfo(visibleItems(), items.length, Object.keys(heightManager.getHeightCache()).length, heightManager.averageHeight, heightManager.scrollTop, 0, totalHeight());
        $$renderer2.push(`${escape_html(debugFunction ? debugFunction(debugInfo) : console.info("Virtual List Debug:", debugInfo))}`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div${attributes(
        {
          "data-original-index": currentItemWithIndex.originalIndex,
          ...testId ? {
            "data-testid": `${testId}-item-${currentItemWithIndex.originalIndex}`
          } : {}
        },
        "svelte-plopdb"
      )}>`);
      renderItem($$renderer2, currentItemWithIndex.item, currentItemWithIndex.originalIndex);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div>`);
    bind_props($$props, { scrollToIndex, scroll });
  });
}
class RecomputeScheduler {
  onRecompute;
  isScheduled = false;
  isPending = false;
  blockDepth = 0;
  timeoutId = null;
  constructor(onRecompute) {
    this.onRecompute = onRecompute;
  }
  schedule = () => {
    if (this.blockDepth > 0) {
      this.isPending = true;
      return;
    }
    if (this.isScheduled)
      return;
    this.isScheduled = true;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.isScheduled = false;
      this.onRecompute();
    }, 0);
  };
  block = () => {
    this.blockDepth += 1;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.isScheduled = false;
      this.isPending = true;
    }
  };
  unblock = () => {
    if (this.blockDepth === 0)
      return;
    this.blockDepth -= 1;
    if (this.blockDepth === 0 && this.isPending) {
      this.isPending = false;
      this.onRecompute();
    }
  };
  cancel = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.isScheduled = false;
    this.isPending = false;
  };
}
class ReactiveListManager {
  // Reactive state using Svelte 5 runes
  _totalMeasuredHeight = 0;
  _measuredCount = 0;
  _itemLength = 0;
  _itemHeight = 40;
  _averageHeight = 40;
  _totalHeight = 0;
  _measuredFlags = null;
  _initialized = false;
  _scrollTop = 0;
  _containerElement = null;
  _viewportElement = null;
  _internalDebug = false;
  _isReady = false;
  _dynamicUpdateInProgress = false;
  _dynamicUpdateDepth = 0;
  // Grid detection (CSS-first)
  _itemsWrapperElement = null;
  _gridDetected = false;
  _gridColumns = 1;
  _gridObserver = null;
  _mutationObserver = null;
  // Internal cache of measured heights by index
  _heightCache = {};
  // Recompute scheduling
  _scheduler = new RecomputeScheduler(() => this.recomputeDerivedHeights());
  recomputeDerivedHeights() {
    const average = this._measuredCount > 0 ? this._totalMeasuredHeight / this._measuredCount : this._itemHeight;
    this._averageHeight = average;
    const unmeasuredCount = this._itemLength - this._measuredCount;
    this._totalHeight = this._totalMeasuredHeight + unmeasuredCount * average;
  }
  recomputeIsReady() {
    this._isReady = !!this._containerElement && !!this._viewportElement;
  }
  scheduleRecomputeDerivedHeights() {
    const isJsdom = typeof navigator !== "undefined" && typeof navigator.userAgent === "string" ? /jsdom/i.test(navigator.userAgent) : false;
    if (typeof window === "undefined" || isJsdom) {
      this.recomputeDerivedHeights();
      return;
    }
    if (this._dynamicUpdateDepth > 0) {
      this._scheduler.block();
      return;
    }
    this._scheduler.schedule();
  }
  /**
   * Get total measured height of all measured items
   */
  get totalMeasuredHeight() {
    return this._totalMeasuredHeight;
  }
  /**
   * Get count of items that have been measured
   */
  get measuredCount() {
    return this._measuredCount;
  }
  /**
   * Get total number of items in the list
   */
  get itemLength() {
    return this._itemLength;
  }
  /**
   * Get/Set the height to use for unmeasured items (reactive)
   */
  get itemHeight() {
    return this._itemHeight;
  }
  set itemHeight(value) {
    this._itemHeight = value;
    this.scheduleRecomputeDerivedHeights();
  }
  /**
   * Get/Set initialized flag
   */
  get initialized() {
    return this._initialized;
  }
  set initialized(value) {
    if (this._initialized) {
      throw new Error("ReactiveListManager: initialized flag cannot be set to true after it has been set to true");
    }
    this._initialized = value;
  }
  /**
   * Get/Set current scrollTop (reactive)
   */
  get scrollTop() {
    return this._scrollTop;
  }
  set scrollTop(value) {
    if (this._internalDebug) {
      this.#debugCheckScrollTopRepeat(value);
    }
    this._scrollTop = value;
  }
  /**
   * Container element reference (reactive, nullable)
   *
   * Why both `containerElement` and `container` exist:
   * - `containerElement` is a nullable, reactive reference intended for Svelte `bind:this` wiring
   *   from components. It may be temporarily null during mount/unmount and is safe to read as
   *   a possibly-null value. Setting it more than once is prohibited to catch wiring bugs early.
   * - `container` is the non-null accessor for internal consumers that require a definite
   *   HTMLElement once the manager is wired. It throws until the manager is `isReady === true`
   *   (i.e., both container and viewport are present). Use this when you want a guaranteed DOM node.
   */
  get containerElement() {
    return this._containerElement;
  }
  get container() {
    if (!this._isReady) {
      throw new Error("ReactiveListManager: container is not ready");
    }
    return this._containerElement;
  }
  set containerElement(el) {
    this._containerElement = el;
    this.recomputeIsReady();
  }
  /**
   * Viewport element reference (reactive, nullable)
   *
   * Why both `viewportElement` and `viewport` exist:
   * - `viewportElement` is a nullable, reactive reference intended for Svelte `bind:this` wiring
   *   from components. It may be temporarily null during mount/unmount and is safe to read as
   *   a possibly-null value. Setting it more than once is prohibited to catch wiring bugs early.
   * - `viewport` is the non-null accessor for internal consumers that require a definite
   *   HTMLElement once the manager is wired. It throws until the manager is `isReady === true`
   *   (i.e., both container and viewport are present). Use this when you want a guaranteed DOM node.
   */
  get viewportElement() {
    return this._viewportElement;
  }
  get viewport() {
    if (!this._isReady) {
      throw new Error("ReactiveListManager: viewport is not ready");
    }
    return this._viewportElement;
  }
  set viewportElement(el) {
    this._viewportElement = el;
    this.recomputeIsReady();
  }
  /**
   * Items wrapper element reference (reactive, nullable)
   *
   * Used for CSS-based grid detection. When set, the manager will auto-detect
   * whether the items container is a grid and how many columns it defines.
   */
  get itemsWrapperElement() {
    return this._itemsWrapperElement;
  }
  set itemsWrapperElement(el) {
    if (this._itemsWrapperElement !== el) {
      if (this._gridObserver) {
        try {
          this._gridObserver.disconnect();
        } catch {
        }
        this._gridObserver = null;
      }
      if (this._mutationObserver) {
        try {
          this._mutationObserver.disconnect();
        } catch {
        }
        this._mutationObserver = null;
      }
    }
    this._itemsWrapperElement = el;
    if (!el) {
      this._gridDetected = false;
      this._gridColumns = 1;
      return;
    }
    this.#attachGridObserver();
    this.#attachMutationObserver();
    this.#detectGridColumns();
  }
  /** Whether a CSS grid was detected on the items wrapper */
  get gridDetected() {
    return this._gridDetected;
  }
  /** Number of columns when a grid is detected; 1 when not a grid */
  get gridColumns() {
    return this._gridColumns;
  }
  get isReady() {
    return this._isReady;
  }
  /**
   * Whether a dynamic update is currently running.
   * Set to true while `runDynamicUpdate` is executing.
   */
  get isDynamicUpdateInProgress() {
    return this._dynamicUpdateDepth > 0;
  }
  /**
   * Begin a dynamic update. Handles nested calls: the first call disables UA scroll anchoring,
   * subsequent calls just increment depth. Safe to call when not wired; styles are only toggled
   * when both container and viewport are ready.
   */
  startDynamicUpdate() {
    const isOuter = this._dynamicUpdateDepth === 0;
    this._dynamicUpdateDepth += 1;
    if (isOuter) {
      this._dynamicUpdateInProgress = true;
      if (this._isReady && this._viewportElement) {
        this._viewportElement.style.setProperty("overflow-anchor", "none");
      }
    }
  }
  /**
   * End a dynamic update started by `startDynamicUpdate`. Handles nesting: only the final
   * corresponding end call re-enables UA scroll anchoring. Guards against underflow.
   */
  endDynamicUpdate() {
    if (this._dynamicUpdateDepth <= 0) {
      return;
    }
    this._dynamicUpdateDepth -= 1;
    if (this._dynamicUpdateDepth === 0) {
      if (this._isReady && this._viewportElement) {
        this._viewportElement.style.setProperty("overflow-anchor", "auto");
      }
      this._dynamicUpdateInProgress = false;
      this._scheduler.unblock();
    }
  }
  /**
   * Run a dynamic update with UA scroll anchoring disabled, then restore it.
   * Accepts a sync or async function and ensures `overflow-anchor` is toggled
   * around the operation. If the manager isn't ready yet, it simply executes `fn`.
   */
  async runDynamicUpdate(fn) {
    this.startDynamicUpdate();
    try {
      const result = fn();
      return result instanceof Promise ? await result : result;
    } finally {
      this.endDynamicUpdate();
    }
  }
  // --- Internal debug helpers (non-exported) ---
  #debugLastScrollValue = null;
  #debugWindowStartMs = 0;
  #debugRepeatCount = 0;
  #debugWarnedThisWindow = false;
  #debugCheckScrollTopRepeat(value) {
    const now = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
    if (this.#debugLastScrollValue === value) {
      if (now - this.#debugWindowStartMs <= 1e3) {
        this.#debugRepeatCount += 1;
        if (this.#debugRepeatCount > 10 && !this.#debugWarnedThisWindow) {
          this.#debugWarnedThisWindow = true;
          console.warn(`
================ SvelteVirtualList DEBUG ================
scrollTop assigned same value ${value} > 10 times within 1s
count=${this.#debugRepeatCount}, windowStart=${Math.round(this.#debugWindowStartMs)}ms
This may indicate redundant updates or feedback loops.
========================================================
`);
        }
      } else {
        this.#debugWindowStartMs = now;
        this.#debugRepeatCount = 1;
        this.#debugWarnedThisWindow = false;
      }
    } else {
      this.#debugLastScrollValue = value;
      this.#debugWindowStartMs = now;
      this.#debugRepeatCount = 1;
      this.#debugWarnedThisWindow = false;
    }
  }
  /**
   * Get the calculated average height of measured items
   * Falls back to itemHeight if no items have been measured yet
   */
  get averageHeight() {
    return this._averageHeight;
  }
  /**
   * Get the reactive total height of all items (measured + estimated)
   * This automatically updates when any dependencies change
   */
  get totalHeight() {
    return this._totalHeight;
  }
  /**
   * Test helper: force a recompute immediately (bypasses scheduler).
   */
  flushRecompute = () => {
    this.recomputeDerivedHeights();
  };
  /**
   * Read-only view of measured heights cache
   */
  getHeightCache() {
    return this._heightCache;
  }
  /**
   * Create a new ReactiveListManager instance
   *
   * @param config - Configuration object containing itemLength and itemHeight
   */
  constructor(config) {
    this._itemLength = config.itemLength;
    this._itemHeight = config.itemHeight;
    this._internalDebug = config.internalDebug ?? false;
    this._measuredFlags = new Uint8Array(Math.max(0, this._itemLength));
    this.recomputeDerivedHeights();
  }
  /**
   * Process height changes incrementally - O(dirty items) instead of O(all items)
   *
   * This is the core optimization: instead of recalculating totals for all items,
   * we only process the items that have changed, maintaining running totals.
   *
   * Accepts any object that has index, oldHeight, and newHeight properties,
   * allowing consumers to pass objects with additional fields.
   *
   * @param dirtyResults - Array of height changes to process
   */
  processDirtyHeights(dirtyResults) {
    if (dirtyResults.length === 0) return;
    let heightDelta = 0;
    let countDelta = 0;
    for (const change of dirtyResults) {
      const { index, oldHeight, newHeight } = change;
      if (oldHeight !== void 0) {
        heightDelta -= oldHeight;
        countDelta -= 1;
      }
      if (newHeight !== void 0) {
        heightDelta += newHeight;
        countDelta += 1;
        this._heightCache[index] = newHeight;
      } else {
        delete this._heightCache[index];
      }
      if (this._measuredFlags && index >= 0 && index < this._measuredFlags.length) {
        this._measuredFlags[index] = 1;
      }
    }
    const isJsdom = typeof navigator !== "undefined" && typeof navigator.userAgent === "string" ? /jsdom/i.test(navigator.userAgent) : false;
    const isNonBrowser = typeof window === "undefined" || isJsdom;
    if (isNonBrowser) {
      if (heightDelta === 0 && countDelta === 0) return;
    } else {
      if (countDelta === 0) return;
    }
    this._totalMeasuredHeight += heightDelta;
    this._measuredCount += countDelta;
    this.scheduleRecomputeDerivedHeights();
  }
  /**
   * Update when items array length changes
   *
   * @param newLength - New total number of items
   */
  updateItemLength(newLength) {
    this._itemLength = newLength;
    this._measuredFlags = new Uint8Array(Math.max(0, newLength));
    this.recomputeDerivedHeights();
  }
  /**
   * Update estimated height for unmeasured items
   *
   * @param newEstimatedHeight - New estimated height
   */
  updateEstimatedHeight(newEstimatedHeight) {
    this._itemHeight = newEstimatedHeight;
    this.scheduleRecomputeDerivedHeights();
  }
  /**
   * Set a single measured height and update totals
   */
  setMeasuredHeight(index, height) {
    if (index < 0 || index >= this._itemLength) return;
    const prev = this._heightCache[index];
    if (Number.isFinite(prev) && prev > 0) {
      this._totalMeasuredHeight -= prev;
    } else {
      this._measuredCount += 1;
    }
    if (Number.isFinite(height) && height > 0) {
      this._heightCache[index] = height;
      this._totalMeasuredHeight += height;
      this.scheduleRecomputeDerivedHeights();
    }
  }
  /**
   * Reset all state to initial values
   *
   * Useful for testing or when completely reinitializing the list
   */
  reset() {
    this._totalMeasuredHeight = 0;
    this._measuredCount = 0;
    this._measuredFlags = this._itemLength > 0 ? new Uint8Array(this._itemLength) : null;
    this.scheduleRecomputeDerivedHeights();
  }
  /**
   * Get comprehensive debug information
   *
   * @returns Debug information object
   */
  getDebugInfo() {
    const info = {
      totalMeasuredHeight: this._totalMeasuredHeight,
      measuredCount: this._measuredCount,
      itemLength: this._itemLength,
      coveragePercent: this._itemLength > 0 ? this._measuredCount / this._itemLength * 100 : 0,
      itemHeight: this._itemHeight,
      averageHeight: this.averageHeight,
      totalHeight: this.totalHeight,
      gridDetected: this._gridDetected,
      gridColumns: this._gridColumns
    };
    return info;
  }
  /**
   * Get the percentage of items that have been measured
   *
   * @returns Percentage (0-100) of measured items
   */
  getMeasurementCoverage() {
    return this.getDebugInfo().coveragePercent;
  }
  /**
   * Check if the manager has sufficient measurement data
   *
   * @param threshold - Minimum percentage of items that should be measured (default: 10)
   * @returns true if coverage meets threshold
   */
  hasSufficientMeasurements(threshold = 10) {
    return this.getMeasurementCoverage() >= threshold;
  }
  /** Public: Re-run CSS grid detection immediately */
  recomputeGridDetection() {
    this.#detectGridColumns();
  }
  // --- Grid detection helpers ---
  #attachGridObserver() {
    const el = this._itemsWrapperElement;
    if (typeof window === "undefined" || !el) return;
    try {
      this._gridObserver = new ResizeObserver(() => {
        this.#detectGridColumns();
      });
      this._gridObserver.observe(el);
    } catch {
      this._gridObserver = null;
    }
  }
  #attachMutationObserver() {
    const el = this._itemsWrapperElement;
    if (typeof window === "undefined" || !el) return;
    try {
      this._mutationObserver = new MutationObserver((records) => {
        for (const rec of records) {
          if (rec.type === "attributes" && (rec.attributeName === "class" || rec.attributeName === "style")) {
            this.#detectGridColumns();
            break;
          }
        }
      });
      this._mutationObserver.observe(el, { attributes: true, attributeFilter: ["class", "style"] });
    } catch {
      this._mutationObserver = null;
    }
  }
  #detectGridColumns() {
    const el = this._itemsWrapperElement;
    if (!el) {
      this._gridDetected = false;
      this._gridColumns = 1;
      return;
    }
    let detected = false;
    let columns = 1;
    try {
      const style = getComputedStyle(el);
      if (style.display === "grid") {
        const template = style.gridTemplateColumns;
        const repeatMatch = /repeat\(\s*(\d+)\s*,/i.exec(template);
        if (repeatMatch && repeatMatch[1]) {
          columns = Math.max(1, parseInt(repeatMatch[1], 10));
          detected = true;
        } else if (template && template !== "none") {
          const count = this.#countTracksFromTemplate(template);
          if (Number.isFinite(count) && count > 0) {
            columns = count;
            detected = true;
          }
        }
      }
    } catch {
    }
    if (!detected) {
      const children = el.children;
      if (children && children.length > 0) {
        const firstTop = children[0].getBoundingClientRect().top;
        let countSameRow = 0;
        for (let i = 0; i < children.length; i += 1) {
          const top = children[i].getBoundingClientRect().top;
          if (Math.abs(top - firstTop) <= 1) {
            countSameRow += 1;
          } else {
            break;
          }
        }
        if (countSameRow > 0) {
          columns = countSameRow;
          detected = countSameRow > 1;
        }
      }
    }
    this._gridDetected = detected;
    this._gridColumns = Math.max(1, columns);
    if (this._internalDebug) {
      console.info("[ReactiveListManager] grid detection:", { detected: this._gridDetected, columns: this._gridColumns });
    }
  }
  #countTracksFromTemplate(template) {
    let depth = 0;
    let tokens = 0;
    let inToken = false;
    for (let i = 0; i < template.length; i += 1) {
      const ch = template[i];
      if (ch === "(") depth += 1;
      else if (ch === ")") depth = Math.max(0, depth - 1);
      if (depth === 0 && /\s/.test(ch)) {
        if (inToken) {
          tokens += 1;
          inToken = false;
        }
      } else if (ch !== " ") {
        inToken = true;
      }
    }
    if (inToken) tokens += 1;
    return tokens;
  }
}
const key = Symbol("TABS");
const setTabContext = (input) => {
  const tabs = {
    get active() {
      return input();
    }
  };
  setContext(key, tabs);
};
const getTabContext = () => {
  return getContext(key);
};
function Tab($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { list, class: className, children } = $$props;
    let active = list[0].id;
    setTabContext(() => active);
    let focus = 0;
    $$renderer2.push(`<div${attr_class(clsx(className), "svelte-h0kac2")}><div class="tablist svelte-h0kac2" role="tablist" tabindex="0" aria-orientation="horizontal"><!--[-->`);
    const each_array = ensure_array_like(
      // tabs[focus].setAttribute("tabindex", "-1");
      // tabs[focus].setAttribute("tabindex", "0");
      list
    );
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let item = each_array[i];
      $$renderer2.push(`<button type="button" role="tab"${attr("aria-selected", active === item.id)}${attr("aria-controls", `${item.id}-panel`)}${attr("tabindex", active === item.id || focus === i ? 0 : -1)} class="tab svelte-h0kac2">`);
      if (active === item.id) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="backdrop svelte-h0kac2"></span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <span>${escape_html(item.title)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function Tabpanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { id, children } = $$props;
    let tab = getTabContext();
    $$renderer2.push(`<div${attr("id", `${id}-panel`)} role="tabpanel"${attr("aria-labelledby", id)} tabindex="0"${attr("hidden", tab.active !== id)} class="tab-panel">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function player($$renderer) {
  $$renderer.push(`<div class="player svelte-18z31m2"><div class="thumbnail svelte-18z31m2">`);
  Image($$renderer, {
    src: audiometadata.track.image,
    alt: audiometadata.track.title,
    full: true
  });
  $$renderer.push(`<!----></div> <div class="details svelte-18z31m2"><div class="text-lg">`);
  RunningText($$renderer, {
    textAlign: "center",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->${escape_html(audiometadata.track.title)}`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div> <div class="feed svelte-18z31m2">`);
  if (audiometadata.track.explicit) {
    $$renderer.push("<!--[-->");
    Icon($$renderer, {
      name: "explicit",
      "aria-label": "explicit content",
      class: "explicit",
      stroke: "none",
      size: 18
    });
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <span class="truncate">${escape_html(audiometadata.track.feed)}</span></div></div> <div class="controls svelte-18z31m2"><div class="seeker text-sm svelte-18z31m2">`);
  Slider($$renderer, {
    useSlider: true,
    min: 0,
    max: Number.isFinite(audiometadata.duration) && audiometadata.readyState > 0 ? audiometadata.duration : 1,
    get value() {
      return audiometadata.currentTime;
    },
    set value($$value) {
      audiometadata.currentTime = $$value;
      $$settled = false;
    }
  });
  $$renderer.push(`<!----> `);
  if (Number.isFinite(audiometadata.duration)) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div>${escape_html(formatTime(audiometadata.currentTime))}</div> <div>${escape_html(formatTime(audiometadata.duration))}</div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> <div class="control svelte-18z31m2">`);
  Button($$renderer, {
    variant: "theme",
    size: "square",
    title: "Backward 15 seconds",
    onclick: () => audiometadata.currentTime = audiometadata.currentTime -= 15,
    children: ($$renderer2) => {
      Icon($$renderer2, { name: "skip-backward", isHidden: true });
      $$renderer2.push(`<!----> <span class="sr-only">skip 15 second backward</span>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  Button($$renderer, {
    size: "square",
    title: audiometadata.paused ? "Play" : "Pause",
    "aria-pressed": !audiometadata.paused,
    onclick: () => audiometadata.paused = !audiometadata.paused,
    children: ($$renderer2) => {
      if (audiometadata.state === "loading") {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { name: "spinner", isHidden: true, class: "animate-spin" });
      } else {
        $$renderer2.push("<!--[!-->");
        if (audiometadata.state === "play") {
          $$renderer2.push("<!--[-->");
          Icon($$renderer2, { name: "pause", isHidden: true });
        } else {
          $$renderer2.push("<!--[!-->");
          Icon($$renderer2, { name: "play", isHidden: true });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> <span class="sr-only">toggle play and pause</span>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  Button($$renderer, {
    variant: "theme",
    size: "square",
    title: "Forward 15 seconds",
    onclick: () => audiometadata.currentTime = audiometadata.currentTime += 15,
    children: ($$renderer2) => {
      Icon($$renderer2, { name: "skip-forward", isHidden: true });
      $$renderer2.push(`<!----> <span class="sr-only">skip 15 second forward</span>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div> <div class="volume svelte-18z31m2"><div>`);
  Icon($$renderer, { name: "volume", isHidden: true });
  $$renderer.push(`<!----></div> `);
  Slider($$renderer, {
    useSlider: true,
    step: 0.1,
    min: 0,
    max: 1,
    get value() {
      return audiometadata.volume;
    },
    set value($$value) {
      audiometadata.volume = $$value;
      $$settled = false;
    }
  });
  $$renderer.push(`<!----> <div>`);
  Icon($$renderer, { name: "volume-full", isHidden: true });
  $$renderer.push(`<!----></div></div></div></div>`);
}
function FullPlayer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const largeScreen = new MediaQuery("min-width: 768px");
    const TABLISTS = [
      { id: "player", title: "Player" },
      { id: "queue", title: "Queue" },
      { id: "chapters", title: "Chapters" }
    ];
    let lists = largeScreen.current ? TABLISTS.slice(1, 3) : TABLISTS;
    let chapters = audiometadata.chapters.filter((v) => typeof v.toc === "undefined" || v.toc);
    let $$settled2 = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="full-player svelte-18z31m2" role="dialog" aria-label="Full player"${attr("aria-hidden", !page.state.fullPlayer)}><div class="wrapper svelte-18z31m2"><div class="close svelte-18z31m2">`);
      Button($$renderer3, {
        size: "square",
        title: "Close",
        onclick: () => history.back(),
        children: ($$renderer4) => {
          Icon($$renderer4, { name: "close", isHidden: true });
          $$renderer4.push(`<!----> <span class="sr-only">Close modal</span>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <!---->`);
      {
        $$renderer3.push(`<div class="content svelte-18z31m2">`);
        if (largeScreen.current) {
          $$renderer3.push("<!--[-->");
          player($$renderer3);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        Tab($$renderer3, {
          list: lists,
          class: "tabs",
          children: ($$renderer4) => {
            if (!largeScreen.current) {
              $$renderer4.push("<!--[-->");
              Tabpanel($$renderer4, {
                id: TABLISTS[0].id,
                children: ($$renderer5) => {
                  player($$renderer5);
                }
              });
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> `);
            Tabpanel($$renderer4, {
              id: TABLISTS[1].id,
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->queue`);
              }
            });
            $$renderer4.push(`<!----> `);
            Tabpanel($$renderer4, {
              id: TABLISTS[2].id,
              children: ($$renderer5) => {
                if (audiometadata.chapters.length > 0) {
                  $$renderer5.push("<!--[-->");
                  {
                    let renderItem = function($$renderer6, item) {
                      $$renderer6.push(`<button type="button" class="virtual-item text-sm svelte-18z31m2"${attr("aria-current", item.startTime === audiometadata.currentTime)}>`);
                      if (item.img) {
                        $$renderer6.push("<!--[-->");
                        $$renderer6.push(`<div class="img svelte-18z31m2">`);
                        Image($$renderer6, { src: item.img, alt: item.title, full: true });
                        $$renderer6.push(`<!----></div>`);
                      } else {
                        $$renderer6.push("<!--[!-->");
                      }
                      $$renderer6.push(`<!--]--> <div class="data svelte-18z31m2"><div class="title">${escape_html(item.title)}</div> <div class="time">${escape_html(formatTime(item.startTime))}</div></div></button>`);
                    };
                    SvelteVirtualList($$renderer5, { items: chapters, renderItem, $$slots: { renderItem: true } });
                  }
                } else {
                  $$renderer5.push("<!--[!-->");
                  $$renderer5.push(`No chapters provide.`);
                }
                $$renderer5.push(`<!--]-->`);
              }
            });
            $$renderer4.push(`<!---->`);
          }
        });
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!----></div></div>`);
    }
    do {
      $$settled2 = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled2);
    $$renderer2.subsume($$inner_renderer);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let meta = page.data.meta;
    let title = (() => {
      if (audiometadata.track.enclosure !== "" && !audiometadata.paused) {
        return `${audiometadata.track.title} | ${TITLE_SITE}`;
      }
      if (meta) {
        return `${meta.title} | ${TITLE_SITE}`;
      }
      return TITLE_SITE;
    })();
    let description = meta?.description ?? DESCRIPTION_SITE;
    let image = asset("/default-open-graph.png");
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title)}</title>`);
      });
      $$renderer3.push(`<meta name="title"${attr("content", title)}/> <meta name="description"${attr("content", description)}/> <link rel="canonical"${attr("href", page.url.href)}/> <meta property="og:type" content="website"/> <meta property="og:url"${attr("content", page.url.href)}/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:image"${attr("content", image)}/> <meta property="twitter:card" content="summary_large_image"/> <meta property="twitter:url"${attr("content", page.url.href)}/> <meta property="twitter:title"${attr("content", title)}/> <meta property="twitter:description"${attr("content", description)}/> <meta property="twitter:image"${attr("content", image)}/>`);
    });
    Header($$renderer2);
    $$renderer2.push(`<!----> <main${attr("inert", useUI.inert, true)}>`);
    children($$renderer2);
    $$renderer2.push(`<!----> `);
    if (navigating.from) {
      $$renderer2.push("<!--[-->");
      LoadingIndicator($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main> `);
    if (useUI.menuOpen) {
      $$renderer2.push("<!--[-->");
      Sidenav($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (useUI.playerShown) {
      $$renderer2.push("<!--[-->");
      Player($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (page.state.fullPlayer) {
      $$renderer2.push("<!--[-->");
      FullPlayer($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _layout as default
};
