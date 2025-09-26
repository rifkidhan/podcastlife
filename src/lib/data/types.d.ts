export interface BasicFeed {
	id: string;
	author?: string;
	description?: string;
	image: string;
	language: string;
	newestItemPubdate: number;
	tags: string[];
	title: string;
	url: string;
	explicit: boolean;
	hash?: string;
}

export interface TrendingFeed extends BasicFeed {
	trendScore?: number;
}

export interface Feed extends BasicFeed {
	itunesId?: number;
	contentType: string;
	generator?: string;
	itunesType?: string;
	link?: string;
	oldestItemPubdate: string;
	originalUrl?: string;
	ownerName?: string;
	podcastGuid: string;
	copyright?: string;
}

export interface AlternativeEnclosure {
	type: string;
	length: number;
	source: {
		uri: string;
		contentType: string;
	}[];
	default: boolean;
}

export interface Enclosure {
	length: number;
	type: string;
	url: string;
}
interface Recipient {
	address: string;
	customKey?: string;
	customValue?: string;
	fee: boolean;
	name?: string;
	split: number;
	type: string;
}
interface Value {
	method: string;
	recipients: Recipient[];
	suggested?: string;
	type: string;
}

interface Items {
	author?: string;
	description?: string;
	enclosure: Enclosure;
	feedId: string;
	feedTitle: string;
	feedImage: string;
	guid?: string;
	image: string;
	link?: string;
	title?: string;
	value?: Value;
}

interface Transcript {
	url: string;
}

interface Person {
	group?: string;
	href?: string;
	img?: string;
	name: string;
	role?: string;
}

interface Episode extends Items {
	chapters?: string;
	content?: string;
	duration: number;
	episode?: number;
	itunesEpisode?: number;
	episodeType?: string;
	explicit: boolean;
	persons?: Person[];
	pubDate?: string;
	season?: number;
	subtitle?: string;
	summary?: string;
	transcripts?: Transcript[];
	alternativeEnclosures?: AlternativeEnclosure[];
}

interface Live extends Items {
	explicit?: boolean;
	end?: string;
	persons?: Person[];
	start: string;
	status: "live" | "ended" | "pending";
	alternativeEnclosures?: AlternativeEnclosure[];
}

type SingleEpisodeType = Omit<Episode, "itunesEpisode" | "summary" | "content" | "subtitle"> &
	Partial<Pick<Live, "end" | "status" | "start">>;

export type Trending = {
	data: BasicFeed[];
};

export type Podcast = {
	data: {
		feed: Feed;
		episodes: Episode[];
		lives?: Live[];
	};
};

export type LivePodcast = {
	data: {
		id: number;
		guid: string;
		title: string;
		link: string;
		datePublished: number;
		datePublishedPretty: string;
		dateCrawled: number;
		enclosureUrl: string;
		enclosureType: string;
		enclosureLength: number;
		image: string;
		feedItunesId: number;
		feedImage: string;
		feedId: number;
		feedTitle: string;
		feedLanguage: string;
		author?: string;
		blurhash?: string;
		description?: string;
		startTime: number;
		endTime: number;
		status: "ended" | "live";
		podcastGuid: string;
		explicit: boolean;
	}[];
};

export type PodcastByCategory = {
	data: BasicFeed[];
	meta: {
		page: {
			cursor: string;
			more: boolean;
			size: number;
		};
	};
};

export type SingleEpisode = {
	data: SingleEpisodeType;
};

export type RecentPodcast = {
	data: BasicFeed[];
};

export interface Chapter {
	startTime: number;
	endTime?: number;
	title?: string;
	img: string;
	toc?: boolean;
}
