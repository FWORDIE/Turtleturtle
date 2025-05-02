<script lang="ts">
    import { animationTime } from '$lib/store'
    import { fly } from 'svelte/transition'

    let { children, vertical = false } = $props()
</script>

<div
    class="buttonBox"
    class:vertical
    in:fly|global={{
        duration: $animationTime,
        opacity: 0,
        y: 100,
        delay: $animationTime,
    }}
    out:fly|global={{ duration: $animationTime, opacity: 0, y: 50 }}
>
    {@render children()}
</div>

<style lang="scss">
    .buttonBox {
        position: fixed;
        bottom: var(--largePadding);
        left: var(--largePadding);
        display: flex;
        justify-content: center;
        width: calc(100% - (2 * var(--largePadding)));
        flex-wrap: wrap;
        gap: var(--largePadding);
        z-index: 99;
    }

    :global(.splashScreen .buttonBox){
        position: sticky;
        bottom: 0px;
        width: 100%;
    }
</style>
