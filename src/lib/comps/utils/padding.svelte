<script lang="ts">
    let { num = 1 } = $props()
</script>
{#each { length: num }, rank}
<div class="padding"></div>
{/each}

<style lang="scss">
    .padding {
        height: var(--padding);
        width: var(--padding);
    }
</style>
