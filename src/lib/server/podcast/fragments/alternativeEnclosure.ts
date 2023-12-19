const source = /* GraphQL */ `
    fragment sourceAlt on AlternativeEnclosureSource {
        contentType
        uri
    }
`

const alternativeEnclosureFragment = /* GraphQL */ `
    fragment alternativeEnclosure on AlternativeEnclosure {
        bitrate
        codecs
        default
        height
        lang
        length
        rel
        source {
            ...sourceAlt
        }
        title
        type
    }
    ${source}
`

export default alternativeEnclosureFragment