<script>
import Card from "./card/Card.svelte";
import { urls } from "$lib/url-helper.js";

export let txn
export let networkId

const renderBlockNumber = n =>
    `<a href="${urls.block( networkId, n )}" class="link">${n}</a>`

const keys = [
    { key: "blockNumber", render: renderBlockNumber },
    { key: "hash" },
    { key: "nonce" },
    { key: "blockHash" },
    { key: "blobVersionedHashes" },
    { key: "chainId" },
    { key: "data" },
    { key: "from" },
    { key: "to" },
    { key: "gasLimit" },
    { key: "gasPrice" },
    { key: "maxFeePerGas" },
    { key: "maxPriorityFeePerGas" },
    { key: "maxFeePerBlobGas" },
    { key: "accessList" },
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
        <span class="text-xs font-light uppercase">Transaction</span>
        <h2 class="font-semibold text-sm">{txn.hash}</h2>
    </div>
    <div class="overflow-x-auto">
        <table class="table table-sm">
            {#if keys.length}
                <tbody>
                    {#each keys as def}
                        <tr>
                            <th class="w-44">{def.key}</th>
                            <td class="font-mono">{@html
                                typeof def.render === 'function'
                                    ? def.render( txn[def.key] )
                                    : txn[def.key]
                            }</td>
                        </tr>
                    {/each}
                </tbody>
            {/if}
        </table>
    </div>
</Card>