<script>
export let href
export let text
export let copydata

const copy = data => async event=>{
    try {
        await navigator.clipboard.writeText( data )
    } catch ( err ) {
        console.log( err )
    }
}
</script>
{#if text}
<div class="flex items-center gap-1">
    <a {href} class="link">
        {@html text}
    </a>
    <button class="btn btn-xs btn-ghost" on:click={copy(copydata)}>
        <span class="icon-[solar--copy-line-duotone]"></span>
    </button>
</div>
{/if}
