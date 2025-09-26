import { d as getPodcast } from "../../../../chunks/podcast.server.js";
const load = async ({ setHeaders, params }) => {
  const podcast = await getPodcast(params.feedId);
  const { feed, episodes, lives } = podcast;
  {
    setHeaders({
      "cache-control": "private, max-age=7200"
    });
  }
  return {
    podcast: feed,
    episodes,
    live: lives,
    meta: {
      title: feed.title
    }
  };
};
export {
  load
};
