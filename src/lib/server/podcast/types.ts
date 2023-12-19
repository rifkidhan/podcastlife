interface BasicFeed {
	id: string;
	author?: string;
	description?: string;
	image: string;
	itunesId?: string;
	language: string;
	newestItemPublishTime: string;
	tags: string[];
	title: string;
	url: string;
}

interface TrendingFeed extends BasicFeed {
	trendScore?: number;
}

interface Feed extends BasicFeed {
	contentType: string;
	explicit: boolean;
	generator?: string;
	itunesType?: string;
	link?: string;
	oldestItemPublishTime: string;
	originalUrl?: string;
	ownerName?: string;
	podcastGuid: string;
	copyright?: string;
}

interface Enclosure {
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
	episodeType?: string;
	explicit: boolean;
	persons?: Person[];
	pubDate?: string;
	season?: number;
	subtitle?: string;
	summary?: string;
	transcripts?: Transcript[];
}

interface Live extends Items {
	end?: string;
	link?: string;
	persons?: [Person];
	start: string;
	status: 'live' | 'ended' | 'pending';
}

type SingleEpisodeType = Items &
	Pick<Episode, 'chapters' | 'pubDate' | 'season' | 'transcripts' | 'duration' | 'episode'> &
	Pick<Live, 'end' | 'start' | 'status'>;

export type Trending = {
	data: { trending: TrendingFeed[] };
	variables: {
		limit?: number;
		category?: string;
		language?: 'EN' | 'IN';
		since?: string;
	};
};

export type Podcast = {
	data: {
		podcast: {
			data: Feed;
			episodes: Episode[];
			live?: Live[];
		};
	};
	variables: {
		id: string;
	};
};

export type LivePodcast = {
	data: {
		live: Live[];
	};
};

export type PodcastByCategory = {
	data: {
		podcastsByCategory: {
			data: Feed[];
			info: {
				count: number;
				endCursor?: string;
			};
		};
	};
	variables: {
		limit?: number;
		category: string;
		language?: 'EN' | 'IN';
		cursor?: string;
	};
};

export type SingleEpisode = {
	data: {
		episode: SingleEpisodeType;
	};
	variables: {
		guid: string;
		feedId: string;
	};
};
