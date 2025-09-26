import { g as getTrendings } from "../../../../chunks/podcast.server.js";
import { C as CATEGORIES } from "../../../../chunks/constants.js";
const load = async ({ params }) => {
  const trendings = await getTrendings(params.cat);
  const title = CATEGORIES.find((v) => v.id === params.cat);
  return {
    trending: trendings,
    meta: {
      title: title?.title
    }
  };
};
export {
  load
};
