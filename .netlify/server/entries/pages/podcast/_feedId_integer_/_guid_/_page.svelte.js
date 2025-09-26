import { z as attr, G as ensure_array_like } from "../../../../../chunks/index.js";
import { g as getTime } from "../../../../../chunks/time.js";
import { I as Info } from "../../../../../chunks/Info.js";
import { B as Button, I as Icon } from "../../../../../chunks/Image.js";
import { a as audiometadata } from "../../../../../chunks/player.svelte.js";
import { e as escape_html } from "../../../../../chunks/context.js";
function info($$renderer, name, value) {
  $$renderer.push(`<li><div class="key svelte-1k3zbu4">${escape_html(name)}</div> <div class="value svelte-1k3zbu4">${escape_html(value)}</div></li>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let episode = data.episode;
    {
      let misc = function($$renderer3) {
        if (episode.pubDate) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span>${escape_html(getTime(episode.pubDate))}</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (episode.duration) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span>${escape_html(Math.floor(episode.duration / 60))} min</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }, action = function($$renderer3) {
        Button($$renderer3, {
          onclick: async () => {
            await audiometadata.playTrack({
              feed: episode.feedTitle ?? "untitled",
              feedId: episode.feedId,
              title: episode.title ?? "untitled",
              guid: episode.guid ?? "",
              enclosure: episode.enclosure.url,
              image: episode.image !== "" ? episode.image : episode.feedImage,
              explicit: episode.explicit,
              chaptersUrl: episode.chapters
            });
          },
          children: ($$renderer4) => {
            if (audiometadata.track.enclosure === episode.enclosure.url) {
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
            $$renderer4.push(`<!--]--> <span>Play this episode</span>`);
          },
          $$slots: { default: true }
        });
      };
      Info($$renderer2, {
        img: episode.image !== "" ? episode.image : episode.feedImage,
        title: episode.title ?? "untitled",
        description: episode.description,
        author: episode.feedTitle,
        explicit: episode.explicit,
        author_link: `/podcast/${episode.feedId}`,
        misc,
        action
      });
    }
    $$renderer2.push(`<!----> <hr/> <section><h2 class="text-lg">Information</h2> <ul class="info text-sm svelte-1k3zbu4">`);
    info($$renderer2, "Show", episode.feedTitle);
    $$renderer2.push(`<!----> `);
    if (episode.pubDate) {
      $$renderer2.push("<!--[-->");
      info($$renderer2, "Published", getTime(episode.pubDate));
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (episode.start) {
      $$renderer2.push("<!--[-->");
      info($$renderer2, "Live Start", getTime(episode.start));
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (episode.duration) {
      $$renderer2.push("<!--[-->");
      info($$renderer2, "Duration", `${Math.floor(episode.duration / 60)} min`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (episode.episode) {
      $$renderer2.push("<!--[-->");
      info($$renderer2, "Episode", episode.episode);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (episode.episodeType) {
      $$renderer2.push("<!--[-->");
      info($$renderer2, "Episode", episode.episodeType);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (episode.season) {
      $$renderer2.push("<!--[-->");
      info($$renderer2, "Season", episode.season);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    info($$renderer2, "Rating", episode.explicit ? "Explicit" : "Clean");
    $$renderer2.push(`<!----> `);
    if (episode.link) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<li><div class="key svelte-1k3zbu4">Link</div> <a${attr("href", episode.link)} target="_blank" rel="noopener noreferrer">Go to episode page</a></li>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (episode.persons) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(episode.persons);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let person = each_array[$$index];
        $$renderer2.push(`<!---->${escape_html(person.name)}`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></ul></section>`);
  });
}
export {
  _page as default
};
