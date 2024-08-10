import { findNetwork } from "$lib/model/network.js";

export async function load({params}) {
    const network = findNetwork(params.networkId)

    return {
        network
    }
}