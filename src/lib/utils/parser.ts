import sanitize from 'sanitize-html';

interface Enclosure {
	url: string;
	length: number;
	type: string;
}

interface PodcastPeople {
	name: string;
	role?: string;
	group?: string;
	img?: string;
	href?: string;
}

interface PodcastTranscript {
	url: string;
	type: string;
	language: string;
	rel?: string;
}

export interface LiveEpisode {
	status: 'live' | 'pending' | 'ended';
	start: string;
	end: string;
	guid?: string;
	enclosure: Enclosure;
	title: string;
	description: string;
	explicit: boolean;
	link: string;
	author: string;
	image: string;
	podcastPeople?: PodcastPeople[];
}

export interface Episode {
	title: string;
	guid: string;
	enclosure: Enclosure;
	duration: number;
	explicit: boolean;
	summary: string;
	description: string;
	pubDate: string;
	image: string;
	subtitle?: string;
	content?: string;
	podcastTranscripts?: PodcastTranscript[];
	podcastChapters?: {
		url: string;
		type: string;
	};
	alternativeEnclosures?: {
		type: string;
		length: number;
		default: boolean;
		bitrate?: number;
		title: string;
		source: {
			uri: string;
			contentType: string;
		}[];
	};
	podcastPeople?: PodcastPeople[];
}

export interface PodcastInfo {
	podcastBlocked: string;
	lastUpdate: string;
	title: string;
	description: string;
	link: string;
	explicit: boolean;
	itunesBlock: boolean;
	itunesComplete: boolean;
	itunesImage: string;
	language: string;
	pubDate: string;
	itunesType?: string;
	categories: Array<string>;
	author: string;
	owner: string;
	image: string;
	copyright: string;
	newestItemPubDate: string;
}

const feedParser = (c: any, eps: any[], lives?: any[]) => {
	const info: PodcastInfo = {
		podcastBlocked: c.podcastBlocked,
		lastUpdate: c.lastUpdate,
		title: c.title,
		description: sanitize(c.description),
		link: c.link,
		explicit: c.explicit,
		itunesBlock: c.itunesBlock,
		itunesComplete: c.itunesComplete,
		itunesImage: c.itunesImage,
		language: c.language,
		pubDate: c.pubDate,
		itunesType: c.itunesType,
		categories: c.categories || [],
		author: c.author,
		owner: c.owner?.name,
		image: c.image.url,
		copyright: c.copyright,
		newestItemPubDate: c.newestItemPubDate
	};

	const episodes = eps.map((e: Episode) => {
		return {
			title: e.title || '',
			guid: e.guid,
			enclosure: {
				url: e.enclosure.url,
				length: e.enclosure.length,
				type: e.enclosure.type
			},
			duration: e.duration,
			explicit: e.explicit,
			summary: sanitize(e.summary),
			pubDate: e.pubDate,
			description: sanitize(e.description),
			subtitle: e.subtitle,
			content: e.content ? sanitize(e.content) : e.content,
			podcastTranscripts: e.podcastTranscripts,
			alternativeEnclosure: e.alternativeEnclosures,
			image: e.image ?? c.image.url
		};
	});

	const liveItems = lives?.map((l: LiveEpisode) => {
		return {
			status: l.status,
			title: l.title,
			description: sanitize(l.description),
			start: l.start,
			end: l.end,
			guid: l.guid,
			enclosure: l.enclosure,
			explicit: l.explicit,
			link: l.link,
			author: l.author,
			image: l.image,
			podcastPeople: l.podcastPeople
		};
	});

	return {
		info,
		episodes,
		liveItems
	};
};

export default feedParser;
