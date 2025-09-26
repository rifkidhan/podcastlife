import { g as getTrendings, a as getRecents } from "../../chunks/podcast.server.js";
const load = async ({ setHeaders }) => {
  const [trendings, recents] = await Promise.all([getTrendings(), getRecents()]);
  {
    setHeaders({
      "cache-control": "private, max-age=7200"
    });
  }
  return {
    trendings,
    recents
  };
};
export {
  load
};
