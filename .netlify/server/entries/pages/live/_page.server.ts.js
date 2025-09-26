import { b as getLivePodcast } from "../../../chunks/podcast.server.js";
const load = async () => {
  const data = await getLivePodcast();
  return {
    live: data,
    meta: {
      title: "Live"
    }
  };
};
export {
  load
};
