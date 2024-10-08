import { ethers } from "ethers";
import { derived, writable } from "svelte/store";

// export const provider = new ethers.JsonRpcProvider( `http://127.0.0.1:7545` )
// export const provider = new ethers.JsonRpcProvider( `https://eth.llamarpc.com`)
async function networkIsUp( url ) {
    try {
        const res = await fetch( url, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify( {
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_blockNumber',
                params: []
            } )
        } )
        return res.ok
    } catch ( err ) {
        return false
    }
}

export const createNetwork = (
    {
        id = '',
        name = '',
        url = ''
    } = {} ) => (
    {
        id,
        name,
        url,
        status: 'unknown',
        isAvailable() {
            return this.status === 'up'
        },
        async refreshStatus() {
            this.status = await networkIsUp( this.url ) ? 'up' : 'down'
        }
    }
)

export const networks = [
    createNetwork( {
        id: "ganache",
        name: "Ganache",
        url: "http://127.0.0.1:7545",
    } ),
    createNetwork( {
        id: "eth_sepolia",
        name: "Sepolia",
        url: "https://eth.llamarpc.com",
    } ),
    createNetwork( {
        id: "anvil",
        name: "Anvil",
        url: "http://127.0.0.1:8545",
    } ),
]

export const findNetwork = id =>
    networks.find( network => network.id === id )

export const networkId = writable( 'eth_sepolia' )

export const createNetworkOptions = ( selectedId ) =>
    networks.map( x => ({
        label: x.name,
        value: x.id,
        selected: selectedId === x.id
    }) )
