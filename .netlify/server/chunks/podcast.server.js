import { b as private_env } from "./shared-server.js";
import { error } from "@sveltejs/kit";
const API_URL = private_env.API_URL;
const API_TOKEN = private_env.API_TOKEN;
const api = async ({
  endpoint,
  query
}) => {
  const url = new URL(`${API_URL}${endpoint}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.append(key, value);
    }
  }
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
      "Accept-Encoding": "br"
    }
  });
  if (!data.ok) {
    error(data.status, { message: data.statusText });
  }
  return data.json();
};
const getTrendings = async (cat) => {
  const data = await api({
    endpoint: "/trending",
    query: cat ? {
      cat
    } : void 0
  });
  return data.data;
};
const getRecents = async () => {
  const data = await api({
    endpoint: "/recent"
  });
  return data.data;
};
const getPodcast = async (id) => {
  const data = await api({
    endpoint: `/feed/${id}`
  });
  return data.data;
};
const getSingleEpisode = async (feed_id, guid) => {
  const data = await api({
    endpoint: `/feed/${feed_id}/${encodeURIComponent(guid)}`
  });
  return data.data;
};
const getLivePodcast = async () => {
  const data = await api({
    endpoint: "/live"
  });
  return data.data;
};
const getCategory = async (category, cursor, previous) => {
  let query = {
    perPage: String(50)
  };
  if (cursor && Boolean(previous)) {
    query = {
      ...query,
      before: cursor
    };
  } else if (cursor) {
    query = {
      ...query,
      after: cursor
    };
  }
  const data = await api({
    endpoint: `/categories/${category}`,
    query
  });
  return data;
};
export {
  getRecents as a,
  getLivePodcast as b,
  getCategory as c,
  getPodcast as d,
  getSingleEpisode as e,
  getTrendings as g
};
