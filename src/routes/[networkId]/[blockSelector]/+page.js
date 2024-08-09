import { error } from "@sveltejs/kit";
import { createBlockPages, findBlock, getLatestBlock } from "$lib/model/block.js";
import { createNetworkOptions, findNetwork } from "$lib/model/network.js";
import { createProvider } from "$lib/model/provider.js";


export async function load( { params } ) {

    let errorMessage

    const network = findNetwork( params.networkId )
    if ( ! network ) error( 404, 'Network not found' )

    const provider = createProvider( network.url )
    if ( ! provider ) error( 400, 'Failed to create network provider' )

    let block = await findBlock( provider, params.blockSelector )

    if ( block === null ) {
        errorMessage = `Block not found #${params.blockSelector}`
        block = await getLatestBlock( provider )
    }

    const blockPages = createBlockPages( block )

    const networkOptions = createNetworkOptions( params.networkId )

    return {
        errorMessage,
        block,
        blockPages,
        networkId: network.id,
        networkOptions,
    }
}