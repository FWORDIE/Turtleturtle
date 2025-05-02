<script lang="ts">
    import { getRandomArbitrary } from '$lib/Funcs'
    import { animationTime } from '$lib/store'
    import { fade, scale } from 'svelte/transition'

    let { children } = $props()
    let rotation = getRandomArbitrary(-1.5, 1.5)
</script>

{#key getRandomArbitrary(0, 99)}
    <div
        class="splashScreen"
        style="transform: rotate({rotation}deg);"
        in:scale|global={{
            duration: $animationTime,
            delay: $animationTime,
            opacity: 0,
            start: 1.5,
        }}
        out:fade|global={{ duration: $animationTime / 2 }}
    >
        {@render children()}
    </div>
    <div
        class="darkenBackground"
        in:fade|global={{
            duration: $animationTime,
            delay: $animationTime,
        }}
        out:fade|global={{ duration: $animationTime / 2 }}
    ></div>
{/key}

<style lang="scss">
    .splashScreen {
        position: absolute;
        z-index: 9;
        background-color: var(--lightBlue);
        width: calc(100% - 2 * var(--largePadding));
        max-width: calc(500px - 2 * var(--largePadding));
        display: flex;
        align-items: center;
        justify-content: safe center;
        flex-direction: column;
        padding: var(--largePadding);
        box-shadow: var(--shadowL);
        min-height: 40dvh;
        max-height: 70dvh;
        text-align: center;
        overflow: auto;
    }
    .darkenBackground {
        position: absolute;
        top: 0;
        z-index: 8;
        height: 100dvh;
        width: 100dvw;
        background-color: black;
        opacity: 0.4;
    }
</style>
