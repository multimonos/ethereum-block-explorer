<script>
import Error from "../../../../com/Error.svelte"
import Block from "../../../../com/Block.svelte";
import BlockNavigation from "../../../../com/BlockNavigation.svelte";
import RawJson from "../../../../com/RawJson.svelte";
import { goto } from "$app/navigation";
import { urls } from "$lib/url-helper.js";
import { createBlockSelector } from "$lib/model/block.js";
import StackedLayout from "../../../../com/StackedLayout.svelte";
import Transaction from "../../../../com/Transaction.svelte";

export let data
let error

const setError = msg => {
    error = msg
    setTimeout( () => error = null, 3200 )
}

const onChangeProvider = async ( event ) => {
    const { networkId } = event.detail
    await goto( urls.block( networkId ) )
}

const onClickPage = ( page ) => async ( event ) => {
    await goto( urls.block( data.networkId, page ) )

}

const onSearch = async ( event ) => {
    const { query } = event.detail

    const slug = createBlockSelector( query )
    if ( slug ) {
        await goto( urls.block( networkId, slug ) )
    } else {
        setError( "Invalid query" )
    }
}

$:pages = data.blockPages
$:networkId = data.networkId
$:networkOptions = data.networkOptions
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

<!--    <BlockNavigation-->
<!--        { networkOptions }-->
<!--        on:provider-change={onChangeProvider}-->
<!--        on:first={onClickPage(pages.first)}-->
<!--        on:previous={onClickPage( pages.previous)}-->
<!--        on:next={onClickPage( pages.next)}-->
<!--        on:last={onClickPage( pages.last)}-->
<!--        on:search={onSearch}-->
<!--    />-->

    {#if data.txn}
        <Transaction txn={data.txn} {networkId}/>
        <RawJson obj={data.txn}/>
    {/if}
</StackedLayout>
