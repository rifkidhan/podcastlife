import { c as getCategory } from "../../../../chunks/podcast.server.js";
const load = async ({ params, url, setHeaders }) => {
  const cursor = url.searchParams.get("c");
  const back = url.searchParams.get("back");
  const data = await getCategory(
    params.cat,
    typeof cursor === "string" ? cursor : void 0,
    typeof back === "string" ? back : void 0
  );
  {
    setHeaders({
      "cache-control": "private, max-age=7200"
    });
  }
  return {
    category: data.data,
    info: data.meta.page
  };
};
export {
  load
};
