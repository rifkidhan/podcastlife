import { G as ensure_array_like, K as bind_props, z as attr } from "../../../../chunks/index.js";
import { a as audiometadata } from "../../../../chunks/player.svelte.js";
import { g as getTime } from "../../../../chunks/time.js";
import { I as Info } from "../../../../chunks/Info.js";
import { B as Button, I as Icon, h as html, a as Image } from "../../../../chunks/Image.js";
import { C as Card } from "../../../../chunks/Card.js";
import { e as escape_html } from "../../../../chunks/context.js";
import { L as Livesign } from "../../../../chunks/Livesign.js";
function Pagination($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, page = 1, limit = 30, rootElement, children } = $$props;
    let totalPage = Math.ceil(data.length / limit);
    let start = (page - 1) * limit;
    let end = Math.min(start + limit, data.length);
    let showData = data.slice(start, end);
    const scrollToRoot = () => {
      if (!rootElement) return;
      rootElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const prevButton = () => {
      if (page <= 1) return;
      page--;
      scrollToRoot();
    };
    const nextButton = () => {
      if (page >= totalPage) return;
      page++;
      scrollToRoot();
    };
    $$renderer2.push(`<ul class="pagination svelte-14nrfpk"><!--[-->`);
    const each_array = ensure_array_like(showData);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let item = each_array[i];
      children($$renderer2, item);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]--></ul> `);
    if (data.length > limit) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="page-control svelte-14nrfpk">`);
      Button($$renderer2, {
        variant: "theme",
        title: "Previous page",
        onclick: prevButton,
        disabled: page <= 1,
        children: ($$renderer3) => {
          Icon($$renderer3, { name: "chevron-left", isHidden: true });
          $$renderer3.push(`<!----> <span>Prev</span>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> <div><span>${escape_html(page)}</span> <span>/</span> <span>${escape_html(totalPage)}</span></div> `);
      Button($$renderer2, {
        variant: "theme",
        title: "Next page",
        onclick: nextButton,
        disabled: page >= totalPage,
        children: ($$renderer3) => {
          Icon($$renderer3, { name: "chevron-right", isHidden: true });
          $$renderer3.push(`<!----> <span>Next</span>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { page });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let feed = data.podcast;
    let episodes = data.episodes;
    let live = data.live;
    let epsSection = void 0;
    let episodePage = 1;
    const snapshot = {
      capture: () => episodePage,
      restore: (page) => {
        if (page > 1) {
          episodePage = page;
        }
      }
    };
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      {
        {
          let misc = function($$renderer4) {
            $$renderer4.push(`<!--[-->`);
            const each_array = ensure_array_like(feed.tags);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let tag = each_array[$$index];
              $$renderer4.push(`<span>${escape_html(tag)}</span>`);
            }
            $$renderer4.push(`<!--]-->`);
          }, action = function($$renderer4) {
            Button($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Play latest`);
              },
              $$slots: { default: true }
            });
          };
          Info($$renderer3, {
            img: feed.image,
            img_hash: feed.hash,
            title: feed.title,
            description: feed.description,
            author: feed.author,
            explicit: feed.explicit,
            misc,
            action
          });
        }
        $$renderer3.push(`<!----> <hr/> `);
        if (live && live.length > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<section><h2 class="text-lg font-lancip">Episodes</h2> <ul class="live-section svelte-1dzbwew"><!--[-->`);
          const each_array_1 = ensure_array_like(live);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let item = each_array_1[$$index_1];
            {
              let thumbnail = function($$renderer4) {
                Image($$renderer4, {
                  src: item.image ?? feed.image,
                  alt: item.title ?? feed.title,
                  blurdata: feed.hash
                });
              }, action = function($$renderer4) {
                Button($$renderer4, {
                  size: "square",
                  title: `${audiometadata.track.enclosure === item.enclosure.url && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`,
                  "aria-pressed": audiometadata.track.enclosure === item.enclosure.url && !audiometadata.paused,
                  onclick: async () => await audiometadata.playTrack({
                    feed: feed.title ?? "untitled",
                    feedId: feed.id,
                    title: item.title ?? "untitled",
                    guid: item.guid ?? "",
                    enclosure: item.enclosure.url,
                    image: item.image ?? feed.image,
                    explicit: item.explicit
                  }),
                  children: ($$renderer5) => {
                    if (audiometadata.track.enclosure === item.enclosure.url) {
                      $$renderer5.push("<!--[-->");
                      if (audiometadata.state === "loading") {
                        $$renderer5.push("<!--[-->");
                        Icon($$renderer5, { name: "spinner", isHidden: true, class: "animate-spin" });
                      } else {
                        $$renderer5.push("<!--[!-->");
                        if (audiometadata.state === "play") {
                          $$renderer5.push("<!--[-->");
                          Icon($$renderer5, { name: "pause", isHidden: true });
                        } else {
                          $$renderer5.push("<!--[!-->");
                          Icon($$renderer5, { name: "play", isHidden: true });
                        }
                        $$renderer5.push(`<!--]-->`);
                      }
                      $$renderer5.push(`<!--]-->`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                      Icon($$renderer5, { name: "play", isHidden: true });
                    }
                    $$renderer5.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
              };
              Card($$renderer3, {
                thumbnail,
                action,
                children: ($$renderer4) => {
                  $$renderer4.push(`<div class="time text-sm">`);
                  if (item.status === "live") {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<span>`);
                    Livesign($$renderer4);
                    $$renderer4.push(`<!----></span>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--> <span>`);
                  if (item.status === "live" && item.end) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`Ended ${escape_html(getTime(item.end))}`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--> `);
                  if (item.status === "pending" && item.start) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`Start ${escape_html(getTime(item.start))}`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--> `);
                  if (item.status === "ended" && item.end) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`Ended ${escape_html(getTime(item.end))}`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></span></div> <h3 class="episode-title font-lancip svelte-1dzbwew"><span>`);
                  if (item.explicit) {
                    $$renderer4.push("<!--[-->");
                    Icon($$renderer4, {
                      name: "explicit",
                      stroke: "none",
                      "aria-label": "explicit content",
                      class: "explicit"
                    });
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--> ${escape_html(item.title)}</span></h3> <div class="summary text-sm svelte-1dzbwew">${html(item.description)}</div>`);
                },
                $$slots: { thumbnail: true, action: true, default: true }
              });
            }
          }
          $$renderer3.push(`<!--]--></ul></section>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <section><h2 class="text-lg font-lancip">Episodes</h2> `);
        {
          let children = function($$renderer4, item) {
            {
              let thumbnail = function($$renderer5) {
                Image($$renderer5, {
                  src: item.image ?? feed.image,
                  alt: item.title ?? feed.title,
                  blurdata: feed.hash
                });
              }, action = function($$renderer5) {
                Button($$renderer5, {
                  size: "square",
                  title: `${audiometadata.track.enclosure === item.enclosure.url && !audiometadata.paused ? "Pause" : "Play"} ${item.title ?? "untitled"}`,
                  "aria-pressed": audiometadata.track.enclosure === item.enclosure.url && !audiometadata.paused,
                  onclick: async () => await audiometadata.playTrack({
                    feed: feed.title ?? "untitled",
                    feedId: feed.id,
                    title: item.title ?? "untitled",
                    guid: item.guid ?? "",
                    enclosure: item.enclosure.url,
                    image: item.image ?? feed.image,
                    explicit: item.explicit,
                    chaptersUrl: item.chapters
                  }),
                  children: ($$renderer6) => {
                    if (audiometadata.track.enclosure === item.enclosure.url) {
                      $$renderer6.push("<!--[-->");
                      if (audiometadata.state === "loading") {
                        $$renderer6.push("<!--[-->");
                        Icon($$renderer6, { name: "spinner", isHidden: true, class: "animate-spin" });
                      } else {
                        $$renderer6.push("<!--[!-->");
                        if (audiometadata.state === "play") {
                          $$renderer6.push("<!--[-->");
                          Icon($$renderer6, { name: "pause", isHidden: true });
                        } else {
                          $$renderer6.push("<!--[!-->");
                          Icon($$renderer6, { name: "play", isHidden: true });
                        }
                        $$renderer6.push(`<!--]-->`);
                      }
                      $$renderer6.push(`<!--]-->`);
                    } else {
                      $$renderer6.push("<!--[!-->");
                      Icon($$renderer6, { name: "play", isHidden: true });
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
              };
              Card($$renderer4, {
                thumbnail,
                action,
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="time text-sm list-with-dot">`);
                  if (item.episode) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<span>Episode ${escape_html(item.episode)}</span>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> `);
                  if (item.pubDate) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<span>${escape_html(getTime(item.pubDate))}</span>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> <span class="duration-span">${escape_html(Math.floor(item.duration / 60))} min</span></div> <h3 class="episode-title font-lancip svelte-1dzbwew"><a${attr("href", `/podcast/${feed.id}/${btoa(item.guid ?? "")}`)} class="svelte-1dzbwew"><span class="svelte-1dzbwew">`);
                  if (item.explicit) {
                    $$renderer5.push("<!--[-->");
                    Icon($$renderer5, {
                      name: "explicit",
                      stroke: "none",
                      "aria-label": "explicit content",
                      class: "explicit"
                    });
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> ${escape_html(item.title)}</span></a></h3> <div class="summary text-sm svelte-1dzbwew">${html(item.summary ?? item.description)}</div>`);
                },
                $$slots: { thumbnail: true, action: true, default: true }
              });
            }
          };
          Pagination($$renderer3, {
            data: episodes,
            startPage: episodePage,
            rootElement: epsSection,
            get page() {
              return episodePage;
            },
            set page($$value) {
              episodePage = $$value;
              $$settled = false;
            },
            children,
            $$slots: { default: true }
          });
        }
        $$renderer3.push(`<!----></section>`);
      }
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { snapshot });
  });
}
export {
  _page as default
};
