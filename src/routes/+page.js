import { networks } from "$lib/model/network.js";

export async function load() {


    // refresh network status
    for ( let i = 0; i < networks.length; i++ ) {
        await networks[i].refreshStatus()
    }


    return {
        networks
    }
}
