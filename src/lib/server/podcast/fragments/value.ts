const recipientFragment = /* GraphQL */ `
    fragment recipient on Recipient {
        address
        customKey
        customValue
        fee
        name
        split
        type
    }
`

const valueFragment = /* GraphQL */ `
    fragment value on Value {
        method
        recipients {
            ...recipient
        }
        suggested
        type
    }
    ${recipientFragment}
`

export default valueFragment