<script>
import Error from "../../../../com/Error.svelte"
import AddressNavigation from "../../../../com/AddressNavigation.svelte";
import { goto } from "$app/navigation";
import { urls } from "$lib/url-helper.js";
import StackedLayout from "../../../../com/StackedLayout.svelte";
import Transaction from "../../../../com/Transaction.svelte";

export let data
let error

const setError = msg => {
    error = msg
    setTimeout( () => error = null, 3200 )
}

const onSearch = async ( event ) => {
    const { query } = event.detail
    await goto( urls.address( networkId, query ) )
}

$:networkId = data.network.id
$:txns = data.txns
$: {
    if ( data.errorMessage ) {
        setError( data.errorMessage )
    }
}
</script>


<StackedLayout>
    {#if error}
        <Error message={error}/>
    {/if}

    <AddressNavigation on:search={onSearch}/>

    {@html data.matchString}

    {#if txns.length}
        {#each txns as txn}
            <Transaction {txn} {networkId}/>
        {/each}
    {:else}
      <p>No transactions found for address <span class="font-mono">{data.address}</span>.</p>
    {/if}
</StackedLayout>
