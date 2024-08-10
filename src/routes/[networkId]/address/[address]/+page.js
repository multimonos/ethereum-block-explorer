import { error } from "@sveltejs/kit";
import { findNetwork } from "$lib/model/network.js";
import { createProvider } from "$lib/model/provider.js";
import { findTransactionsWhere } from "$lib/model/address.js";


export async function load( { params, url } ) {

    let errorMessage

    const {
        txnId,
        networkId,
        address,
    } = params


    const network = findNetwork( networkId )
    if ( ! network ) error( 404, 'Network not found' )

    const provider = createProvider( network.url )
    if ( ! provider ) error( 400, 'Failed to create network provider' )

    // filter
    const filters = {
        from: ( tx ) => tx.from === address,
        to: ( tx ) => tx.to === address,
    }

    const filterName = url.searchParams.has( 'match' )
        ? url.searchParams.get( 'match' )
        : 'from'

    const filter = filters[filterName]

    // txn
    const txns = await findTransactionsWhere(
        provider,
        filter
    )

    const criteria = `${txns.length} transactions found matching <kbd class="kbd kbd-sm">${filterName} = ${address}</kbd>`

    return {
        address,
        txns,
        errorMessage,
        criteria,
        // txn,
        // networkOptions,
    }
}