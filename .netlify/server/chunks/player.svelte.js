import { x as derived } from "./index.js";
import "clsx";
class MediaQuery {
  current;
  /**
   * @param {string} query
   * @param {boolean} [matches]
   */
  constructor(query, matches = false) {
    this.current = matches;
  }
}
function createSubscriber(_) {
  return () => {
  };
}
class Persisted {
  #key;
  #storage;
  #fallback;
  #version = 0;
  #subscribe = createSubscriber();
  constructor(key, fallback, storage = typeof localStorage === "undefined" ? void 0 : localStorage) {
    this.#key = key;
    this.#fallback = fallback;
    this.#storage = storage;
  }
  get current() {
    this.#subscribe();
    this.#version;
    return this.#storage?.getItem(this.#key) ?? this.#fallback;
  }
  set current(v) {
    this.#storage?.setItem(this.#key, v);
    this.#version += 1;
  }
}
class AudioMetadata {
  #track = {
    feed: "",
    feedId: "",
    title: "",
    image: "",
    enclosure: "",
    guid: "",
    explicit: false
  };
  // #trackId = $derived(this.#track.feedId + "_" + this.#track.guid);
  #duration = 0;
  #currentTime = 0;
  #paused = true;
  #readyState = 0;
  #volume = 1;
  #state = derived(() => {
    if (this.#readyState <= 2) return "loading";
    if (this.#paused) return "pause";
    return "play";
  });
  #chapters = new Persisted("chapters", "{chapters: []}");
  get track() {
    return this.#track;
  }
  get paused() {
    return this.#paused;
  }
  set paused(v) {
    this.#paused = v;
  }
  get duration() {
    return this.#duration;
  }
  set duration(value) {
    this.#duration = value;
  }
  get currentTime() {
    return this.#currentTime;
  }
  set currentTime(v) {
    this.#currentTime = v;
  }
  get volume() {
    return this.#volume;
  }
  set volume(v) {
    this.#volume = v;
  }
  get readyState() {
    return this.#readyState;
  }
  set readyState(v) {
    this.#readyState = v;
  }
  get state() {
    return this.#state();
  }
  get chapters() {
    const parse = JSON.parse(this.#chapters.current);
    return parse.chapters;
  }
  async playTrack(options) {
    if (options.enclosure === this.#track.enclosure) {
      this.#paused = !this.#paused;
    } else {
      const { chaptersUrl, ...opts } = options;
      this.#track = opts;
      const chapters = await getChapters(chaptersUrl);
      this.#chapters.current = JSON.stringify({ chapters });
    }
  }
}
const audiometadata = new AudioMetadata();
const getChapters = async (url) => {
  if (!url) return [];
  const res = await fetch(url, { headers: { "user-agent": "PodcastLife/1.0" } });
  if (!res.ok) {
    return [];
  }
  const json = await res.json();
  return json.chapters;
};
export {
  MediaQuery as M,
  Persisted as P,
  audiometadata as a
};
