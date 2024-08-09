<script>
import { onMount } from "svelte";
import { urls } from "$lib/url-helper.js";

export let data
let interval
$:networks = data.networks

const refreshNetworks = async () => {
    for ( let i = 0; i < networks.length; i++ ) {
        await networks[i].refreshStatus()
    }
    networks = networks
}

const cancelNetworkRefresh = () => {
    if ( interval ) clearInterval( interval )
}

onMount( () => {
    interval = setInterval( refreshNetworks, 5000 )
} )
</script>

<div class="flex flex-col gap-2">
    {#if networks}
        {#each networks as network}
            <div class="stats shadow overflow-x-hidden">
                <a class="stat hover:bg-base-200/50 { network.isAvailable() ? 'bg-success/10':'bg-error/20' }"
                   href="{urls.block(network.id)}" on:click={cancelNetworkRefresh}>
                    <div class="stat-title uppercase text-xs">{network.status}</div>
                    <div class="stat-figure">
                        {#if 'up' === network.status}
                            <span class="text-3xl text-success icon-[solar--heart-bold]"></span>
                        {:else}
                            <span class="text-3xl text-error icon-[solar--heart-broken-bold]"></span>
                        {/if}
                    </div>
                    <div class="stat-value">{network.name}</div>
                    <div class="stat-desc">{network.url}</div>
                </a>
            </div>
        {/each}
    {/if}
</div>