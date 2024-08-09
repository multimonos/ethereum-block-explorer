<script>
import { fade } from "svelte/transition";

export let message
</script>
<div class="toast toast-top">
    <div transition:fade role="alert" class="alert alert-error">
        <span class="text-2xl icon-[solar--danger-circle-outline]"></span>
        <span>{@html message}</span>
    </div>
</div>
