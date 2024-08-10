<script>
import Card from "./card/Card.svelte";
import { urls } from "$lib/url-helper.js";
import CopyableLink from "./data/CopyableLink.svelte";

export let txn
export let networkId

const renderBlockLink = n =>
    `<a href="${urls.block( networkId, n )}" class="link">${n}</a>`

const renderAddressLink = address =>
    `<a href="${urls.address( networkId, address )}" class="link">${address}</a>`

const keys = [
    { key: "blockNumber", render: renderBlockLink },
    {
        key: "from",
        com: CopyableLink,
        props: ( x ) => ({
            text: x,
            copydata: x,
            href: urls.address( networkId, x )+'?match=from',
        })
    },
    {
        key: "to",
        com: CopyableLink,
        props: ( x ) => ({
            text: x,
            copydata: x,
            href: urls.address( networkId, x ) +'?match=to',
        })
    },
    {
        key: "hash",
        com: CopyableLink,
        props: ( x ) => ({
            text: x,
            copydata: x,
            href: urls.txn( networkId, x ),
        })
    },
    { key: "nonce" },
    { key: "blockHash" },
    { key: "blobVersionedHashes" },
    { key: "chainId" },
    { key: "data" },
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
                            <td class="font-mono">
                                {#if typeof def.render === 'function'}
                                    {@html def.render( txn[def.key] )}
                                {:else if typeof def.com !== 'undefined'}
                                    <svelte:component this={def.com} {...def.props( txn[def.key] )}/>
                                {:else}
                                    {txn[def.key]}
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            {/if}
        </table>
    </div>
</Card>