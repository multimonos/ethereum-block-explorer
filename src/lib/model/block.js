export const createBlockSelector = str => {
    const allowedStrings = [ 'latest', 'earliest', 'pending' ]
    if ( allowedStrings.includes( str ) ) {
        return str
    }

    if ( ! isNaN( parseInt( str ) ) ) {
        const n = parseInt( str )
        return n >= 0 ? n : 0
    }

    return false
}

export const findBlock = async ( provider, blockSelector ) =>
    await provider.getBlock( createBlockSelector( blockSelector ) )

export const getLatestBlock = async ( provider ) =>
    await provider.getBlock( createBlockSelector( 'latest' ) )

export const findBlockOrLatest = async ( provider, blockSelector ) => {
    const block = await findBlock( provider, blockSelector )

    if ( block !== null ) {
        return block
    }

    const latest = await getLatestBlock( provider )
    return latest
}

export const createBlockPages = block => ({
    first: 'earliest',
    last: 'latest',
    next: block.number + 1,
    previous: block.number > 1 ? block.number - 1 : 0
})