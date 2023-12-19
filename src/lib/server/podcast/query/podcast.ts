import personFragment from '../fragments/person';
import valueFragment from '../fragments/value';
import enclosureFragment from '../fragments/enclosure';
import alternativeEnclosureFragment from '../fragments/alternativeEnclosure';
import transcriptFragment from '../fragments/transcript';

const pageInfoFragment = /* GraphQL */ `
	fragment pageinfo on PageInfo {
		count
		endCursor
	}
`;

const basicFragment = /* GraphQL */ `
	fragment basic on Feed {
		id
		title
		url
		podcastGuid
		author
		description
		explicit
		image
		language
		newestItemPublishTime
		ownerName
	}
`;

export const feedFragment = /* GraphQL */ `
	fragment feed on Feed {
		...basic
		contentType
		generator
		itunesId
		itunesType
		link
		newestItemPublishTime
		originalUrl
		tags
		...value
	}
	${basicFragment}
	${valueFragment}
`;

export const podcastQuery = /* GraphQL */ `
	query getPodcast($id: ID!) {
		podcast(id: $id) {
			data {
				id
				title
				image
				author
				ownerName
				language
				description
				newestItemPublishTime
				tags
				copyright
				link
			}
			episodes {
				title
				description
				image
				guid
				explicit
				pubDate
				enclosure {
					url
				}
	
			}
			live {
				title
				guid
				image
				description
				enclosure {
					url
				}
				start
				end
			}
		}
	}
`;

export const trendingQuery = /* GraphQL */ `
	query onTrending($limit: Int, $category: Category, $language: Language, $since: Since) {
		trending(limit: $limit, category: $category, language: $language, since: $since) {
			id
			title
			image
			newestItemPublishTime
			author
			description
			trendScore
		}
	}
`;

export const getCategoryQuery = /* GraphQL */ `
	query getCategoryPodcast(
		$limit: Int
		$category: Category!
		$language: Language
		$cursor: String
	) {
		podcastsByCategory(limit: $limit, category: $category, language: $language, cursor: $cursor) {
			data {
				id
				title
				image
				newestItemPublishTime
				author
				description
			}
			info {
				...pageinfo
			}
		}
	}
	${pageInfoFragment}
`;
