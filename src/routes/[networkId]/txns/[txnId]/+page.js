import { error } from "@sveltejs/kit";
import { findBlock, getLatestBlock } from "$lib/model/block.js";
import { createNetworkOptions, findNetwork } from "$lib/model/network.js";
import { createProvider } from "$lib/model/provider.js";
import { findTransaction } from "$lib/model/transaction.js";


export async function load( { params } ) {

    let errorMessage
    const { txnId,networkId } = params

    const network = findNetwork( networkId )
    if ( ! network ) error( 404, 'Network not found' )

    const provider = createProvider( network.url )
    if ( ! provider ) error( 400, 'Failed to create network provider' )

    let txn = await findTransaction( provider, txnId )

    if ( txn === null ) {
        errorMessage = `Block not found #${txnId}`
        txn = await getLatestBlock( provider )
    }

    const networkOptions = createNetworkOptions( networkId )

    return {
        errorMessage,
        txn,
        networkId,
        networkOptions,
    }
}