const podcastImageFragment = /* GraphQL */ `
    fragment podcastimage on PodcastImage {
        parsed {
            url
        }
        raw
    }
`

export default podcastImageFragment