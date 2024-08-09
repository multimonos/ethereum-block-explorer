<script>
import {getContext} from "svelte";
import Card from "./card/Card.svelte";

export let block

const keys = [
    "number",
    "nonce",
    "hash",
    "parentHash",
    "baseFeePerGas",
    "blobGasUsed",
    "difficulty",
    "excessBlobGas",
    "extraData",
    "gasLimit",
    "gasUsed",
    "miner",
    "parentBeaconBlockRoot",
    "prevRandao",
    "receiptsRoot",
    "stateRoot",
    "timestamp",
]

const render = val => {
    if ( typeof val === 'object' ) {
        return JSON.stringify( val )
    }
    return val
}

const provider = getContext('provider')
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
                    {#each keys as key}
                        <tr>
                            <th class="w-44">{key}</th>
                            <td class="font-mono">{render( block[key] )}</td>
                        </tr>
                    {/each}
                    <tr>
                        <th class="align-text-top">
                            <div class="flex flex-col">
                                <span>transactions</span>
                                {#if block.transactions.length}
                                    &mdash;{block.transactions.length}
                                {/if}
                            </div>
                        </th>
                        <td>
                            {#if Array.isArray( block.transactions )}
                                <div class="flex flex-col gap-1 font-mono">
                                    {#each block.transactions as hash}
                                        <div>{hash}</div>


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