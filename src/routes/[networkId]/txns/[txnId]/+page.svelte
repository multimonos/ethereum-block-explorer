<script>
import Error from "../../../../com/Error.svelte"
import TransactionNavigation from "../../../../com/TransactionNavigation.svelte";
import RawJson from "../../../../com/RawJson.svelte";
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
    await goto( urls.txn( networkId, query ) )
}

$:networkId = data.networkId
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

    <TransactionNavigation
        on:search={onSearch}
    />

    {#if data.txn}
        <Transaction txn={data.txn} {networkId}/>
        <RawJson obj={data.txn}/>
    {/if}
</StackedLayout>
