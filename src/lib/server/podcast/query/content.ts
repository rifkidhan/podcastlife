import transcriptFragment from '../fragments/transcript';
import enclosureFragment from '../fragments/enclosure';
import valueFragment from '../fragments/value';

export const liveStreamQuery = /* GraphQL */ `
	query liveStream {
		live {
			feedTitle
			feedId
			title
			author
			status
			start
			end
			guid
			image
			enclosure {
				...enclosure
			}
		}
	}
	${enclosureFragment}
`;

export const simpleSingleEpisodeQuery = /* GraphQL */ `
	query getEpisode($guid: String!, $feedId: ID!) {
		episode(guid: $guid, feedId: $feedId) {
			image
			description
			title
			author
			... on Episode {
				duration
				explicit
				transcripts {
					...transcript
				}
				chapters
			}
			... on Live {
				status
				start
				end
			}
		}
	}
	${transcriptFragment}
`;

export const singleEpisodeQuery = /* GraphQL */ `
	query getEpisode($guid: String!, $feedId: ID!) {
		episode(guid: $guid, feedId: $feedId) {
			feedId
			feedTitle
			guid
			image
			link
			description
			title
			author
			enclosure {
				...enclosure
			}
			... on Episode {
				duration
				explicit
				pubDate
				transcripts {
					...transcript
				}
				chapters
				episode
				season
			}
			... on Live {
				feedId
				status
				start
				end
			}
			value {
				...value
			}
		}
	}
	${transcriptFragment}
	${enclosureFragment}
	${valueFragment}
`;
