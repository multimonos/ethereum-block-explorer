export const findTransactionsWhere = async ( provider, where ) => {

    if ( typeof where !== 'function' ) {
        where = () => true
    }

    // search field
    const last = await provider.getBlockNumber()

    // get hashes
    const prms = new Array( last + 1 )
        .fill( null )
        .map( ( _, i ) => i )
        .map( i => provider.getBlock( i, true ) )

    const results = await Promise.allSettled( prms )

    const fulfilled = results.filter( res => res.status === 'fulfilled' )

    const hashes = new Set( fulfilled
        .map( res => res.value )
        .filter( block => block.transactions.length )
        .map( block => block.transactions )
        .flat( Infinity )
    )

    // find txns
    const txnprms = [ ...hashes ].map( hash => provider.getTransaction( hash ) )

    const txnres = await Promise.allSettled( txnprms )

    const txns = txnres
        .filter( res => res.status === 'fulfilled' )
        .map( res => res.value )
        .filter( where )

    // const txns

    // console.log( {
    //     // results,
    //     // last,
    //     // prms,
    //     // hashes,
    //     txns
    // } )

    return txns
}