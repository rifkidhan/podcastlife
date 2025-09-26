import { G as ensure_array_like, z as attr } from "../../../chunks/index.js";
import { a as audiometadata } from "../../../chunks/player.svelte.js";
import { g as getTime } from "../../../chunks/time.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Icon, h as html, a as Image, B as Button } from "../../../chunks/Image.js";
import { L as Livesign } from "../../../chunks/Livesign.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let liveNow = data.live.filter((v) => v.status === "live");
    let liveEnded = data.live.filter((v) => v.status === "ended");
    $$renderer2.push(`<h1 class="text-display">Live</h1> <section><h2 class="text-xl font-lancip">Live Now</h2> <ul class="live-section svelte-jp09wb"><!--[-->`);
    const each_array = ensure_array_like(liveNow);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      {
        let thumbnail = function($$renderer3) {
          Image($$renderer3, {
            src: item.image != "" ? item.image : item.feedImage,
            alt: item.title,
            blurdata: item.blurhash,
            full: true
          });
        }, action = function($$renderer3) {
          Button($$renderer3, {
            size: "square",
            title: `${audiometadata.track.enclosure === item.enclosureUrl && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`,
            "aria-pressed": audiometadata.track.enclosure === item.enclosureUrl && !audiometadata.paused,
            onclick: async () => await audiometadata.playTrack({
              feed: item.feedTitle ?? "untitled",
              feedId: String(item.feedId),
              title: item.title ?? "untitled",
              guid: item.guid ?? "",
              enclosure: item.enclosureUrl,
              image: item.image != "" ? item.image : item.feedImage,
              explicit: item.explicit
            }),
            children: ($$renderer4) => {
              if (audiometadata.track.enclosure === item.enclosureUrl) {
                $$renderer4.push("<!--[-->");
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
                $$renderer4.push(`<!--]-->`);
              } else {
                $$renderer4.push("<!--[!-->");
                Icon($$renderer4, { name: "play", isHidden: true });
              }
              $$renderer4.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
        };
        Card($$renderer2, {
          thumbnail,
          action,
          children: ($$renderer3) => {
            $$renderer3.push(`<div class="time text-sm">`);
            if (item.status === "live") {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<span>`);
              Livesign($$renderer3);
              $$renderer3.push(`<!----></span>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <span>`);
            if (item.status === "live" && item.endTime) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`Ended ${escape_html(getTime(item.endTime))}`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--></span></div> <a${attr("href", `/podcast/${item.feedId}`)} class="episode-author text-sm svelte-jp09wb"><span class="svelte-jp09wb">${escape_html(item.feedTitle)}</span></a> <h3 class="episode-title font-lancip svelte-jp09wb"><span>`);
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
            $$renderer3.push(`<!--]--> ${escape_html(item.title)}</span></h3> <div class="summary text-sm svelte-jp09wb">${html(item.description)}</div>`);
          },
          $$slots: { thumbnail: true, action: true, default: true }
        });
      }
    }
    $$renderer2.push(`<!--]--></ul></section> <section><h2 class="text-xl font-lancip">Ended Live</h2> <ul class="live-section svelte-jp09wb"><!--[-->`);
    const each_array_1 = ensure_array_like(liveEnded);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      {
        let thumbnail = function($$renderer3) {
          Image($$renderer3, {
            src: item.image != "" ? item.image : item.feedImage,
            alt: item.title,
            blurdata: item.blurhash,
            full: true
          });
        }, action = function($$renderer3) {
          Button($$renderer3, {
            size: "square",
            title: `${audiometadata.track.enclosure === item.enclosureUrl && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`,
            "aria-pressed": audiometadata.track.enclosure === item.enclosureUrl && !audiometadata.paused,
            onclick: async () => await audiometadata.playTrack({
              feed: item.feedTitle ?? "untitled",
              feedId: String(item.feedId),
              title: item.title ?? "untitled",
              guid: item.guid ?? "",
              enclosure: item.enclosureUrl,
              image: item.image != "" ? item.image : item.feedImage,
              explicit: item.explicit
            }),
            children: ($$renderer4) => {
              if (audiometadata.track.enclosure === item.enclosureUrl) {
                $$renderer4.push("<!--[-->");
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
                $$renderer4.push(`<!--]-->`);
              } else {
                $$renderer4.push("<!--[!-->");
                Icon($$renderer4, { name: "play", isHidden: true });
              }
              $$renderer4.push(`<!--]-->`);
            },
            $$slots: { default: true }
          });
        };
        Card($$renderer2, {
          thumbnail,
          action,
          children: ($$renderer3) => {
            $$renderer3.push(`<div class="time text-sm">`);
            if (item.status === "live") {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<span>`);
              Livesign($$renderer3);
              $$renderer3.push(`<!----></span>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <span>`);
            if (item.status === "live" && item.endTime) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`Ended ${escape_html(getTime(item.endTime))}`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--></span></div> <a${attr("href", `/podcast/${item.feedId}`)} class="episode-author text-sm svelte-jp09wb"><span class="svelte-jp09wb">${escape_html(item.feedTitle)}</span></a> <h3 class="episode-title font-lancip svelte-jp09wb"><span>`);
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
            $$renderer3.push(`<!--]--> ${escape_html(item.title)}</span></h3> <div class="summary text-sm svelte-jp09wb">${html(item.description)}</div>`);
          },
          $$slots: { thumbnail: true, action: true, default: true }
        });
      }
    }
    $$renderer2.push(`<!--]--></ul></section>`);
  });
}
export {
  _page as default
};
