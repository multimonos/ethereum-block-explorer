<script>
import { createEventDispatcher } from "svelte";

//props
export let networkOptions

//vars
const dispatch = createEventDispatcher()
let query = ""


// fns
const onSearchKey = async ( event ) => {

    if ( ! event.key ) return

    switch ( event.key.toLowerCase() ) {
        case 'escape':
            query = ''
            break;

        case 'enter':
            dispatch( 'search', { query } )
            break;
    }
}

const onWindowKey = event => {
    if ( [ 'k', 'K' ].includes( event.key ) && event.metaKey ) {
        const el = document.getElementById( 'query' )
        if ( el ) {
            el.focus()
            el.select()
        }
    }
}
</script>

<svelte:window on:keydown={onWindowKey}/>

<div class="join join-horizontal">
    <input
        bind:value={query}
        id="query"
        class="input input-sm input-bordered join-item w-32"
        placeholder="⌘K"
        on:keydown={onSearchKey}
    />
    <button on:click={()=>dispatch('first')} class="btn btn-sm join-item" title="First">
        <span class="icon-[solar--double-alt-arrow-left-linear]"></span>
    </button>
    <button on:click={()=>dispatch('previous')} class="btn btn-sm join-item" title="Previous">
        <span class="icon-[solar--alt-arrow-left-linear]"></span>
    </button>
    <button on:click={()=>dispatch('next')} class="btn btn-sm join-item">
        <span class="icon-[solar--alt-arrow-right-linear]"></span>
    </button>
    <button on:click={()=>dispatch('last')} class="btn btn-sm join-item">
        <span class="icon-[solar--double-alt-arrow-right-linear]"></span>
    </button>
    <select class="select select-sm select-bordered join-item" on:change={e => dispatch('provider-change',{networkId: e.target.value})}>
        <option disabled>Chain</option>

        {#each networkOptions as option }
            <option value={option.value} selected={option.selected===true}>{option.label}</option>
        {/each}
    </select>
</div>
