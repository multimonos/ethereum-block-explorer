<script>
import Transaction from "./Transaction.svelte";
import Title from "./card/Title.svelte";
import Card from "./card/Card.svelte";
import { ethers } from "ethers";

export let hashes = []

let txns = []

$:txns = hashes.length === 0
    ? []
    : [ ...hashes ]

$:getTransactions = async (hashList) => {

}
</script>

<Card>

    <Title>transactions</Title>

    {#if txns.length}
        {#each txns as txn}
            <Transaction { txn }/>
        {/each}
    {/if}
</Card>