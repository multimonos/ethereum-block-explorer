<script>
import Card from "./card/Card.svelte";
import { urls } from "$lib/url-helper.js";

export let block
export let networkId

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
]

const copy = async text => {
    try {
        await navigator.clipboard.writeText( text )
    } catch ( err ) {
        console.log( err )
    }
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
                    <tr>
                        <th class="w-44 align-text-top">transactions</th>
                        <td class="font-mono">
                            {#if block.transactions.length}
                                <div class="flex flex-col gap-1">
                                    {#each block.transactions as hash}
                                        <div class="flex items-center">
                                            <button
                                                class="btn btn-xs btn-ghost"
                                                on:click={()=>copy(hash)}>
                                                <span class="icon-[solar--copy-bold-duotone]"></span>
                                            </button>
                                            <a class="link link-hover ml-1" href="{urls.txn( networkId, hash )}">{hash}</a>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </td>
                    </tr>
                </tbody>
            {/if}
        </table>
    </div>
</Card>