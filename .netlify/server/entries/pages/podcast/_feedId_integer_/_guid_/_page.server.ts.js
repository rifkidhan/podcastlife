import { e as getSingleEpisode } from "../../../../../chunks/podcast.server.js";
const load = async ({ params, setHeaders }) => {
  const guid = atob(params.guid);
  const feedId = params.feedId;
  const data = await getSingleEpisode(feedId, guid);
  {
    setHeaders({
      "cache-control": "private, max-age=7200"
    });
  }
  const title = `${data.title ?? "untitled"} - ${data.feedTitle}`;
  return {
    episode: data,
    meta: {
      title
    }
  };
};
export {
  load
};
