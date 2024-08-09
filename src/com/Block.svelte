<script>
import Card from "./card/Card.svelte";
import { urls } from "$lib/url-helper.js";

export let block
export let networkId

const renderTransactions = hashes => {
    let html = `<div class="flex flex-col gap-1">`

    html += hashes
        .map( hash => `<a class="link link-hover" href="${urls.txn( networkId, hash )}">${hash}</a>` )
        .join( `\n` )

    html += `</div>`

    return html
}

const keys = [
    { key: "number" },
    { key: "nonce" },
    { key: "hash" },
    { key: "parentHash" },
    { key: "baseFeePerGas" },
    { key: "blobGasUsed" },
    { key: "difficulty" },
    { key: "excessBlobGas" },
    { key: "extraData" },
    { key: "gasLimit" },
    { key: "gasUsed" },
    { key: "miner" },
    { key: "parentBeaconBlockRoot" },
    { key: "prevRandao" },
    { key: "receiptsRoot" },
    { key: "stateRoot" },
    { key: "timestamp" },
    { key: "transactions", render: renderTransactions },
]

const render = val => {
    if ( typeof val === 'object' ) {
        return JSON.stringify( val )
    }
    return val
}
</script>

<Card>
    <div class="flex flex-col mb-4">
        <span class="text-xs font-light uppercase">block</span>
        <h2 class="text-3xl font-semibold">{block.number}</h2>
    </div>
    <div class="overflow-x-auto">
        <table class="table table-sm">
            {#if keys.length}
                <tbody>
                    {#each keys as def}
                        <tr>
                            <th class="w-44 align-text-top">{def.key}</th>
                            <td class="font-mono">{@html
                                typeof def.render === 'function'
                                    ? def.render( block[def.key] )
                                    : block[def.key]
                            }</td>
                        </tr>
                    {/each}
                </tbody>
            {/if}
        </table>
    </div>
</Card>