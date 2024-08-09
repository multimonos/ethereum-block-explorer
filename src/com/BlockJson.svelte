<script>
import Card from "./card/Card.svelte";

export let block
</script>
<Card>
    <div class="collapse">
        <input type="checkbox"/>
        <div class="collapse-title font-semibold">
            <div class="flex items-center gap-1">
                <span class="text-2xl icon-[solar--code-bold-duotone]"></span>
                <span>JSON</span>
            </div>
        </div>
        <div class="collapse-content">
            <pre>{JSON.stringify( block, null, 2 )}</pre>
        </div>
    </div>
</Card>
