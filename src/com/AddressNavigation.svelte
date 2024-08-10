<script>
import { createEventDispatcher } from "svelte";

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
    query = query.trim()
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
        class="input input-sm input-bordered join-item w-full"
        placeholder="⌘K Find address"
        on:keydown={onSearchKey}
        on:blur={onSearchKey}
    />
</div>
