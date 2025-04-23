<script lang="ts">
    import { getRandomArbitrary } from '$lib/Funcs'
    import { animationTime } from '$lib/store'
    import { fade, scale } from 'svelte/transition'

    let { children } = $props()
    let rotation = getRandomArbitrary(-1.5, 1.5)
</script>

{#key getRandomArbitrary(0, 99)}
    <div
        class="board"
        style="transform: rotate({rotation}deg);"
        in:scale|global={{
            duration: $animationTime,
            delay: $animationTime,
            opacity: 0,
            start: 1.2,
        }}
        out:fade|global={{ duration: $animationTime / 2 }}
    >
        {@render children()}
    </div>
{/key}

<style lang="scss">
    .board {
        padding: var(--padding);
        background-color: var(--white);
        min-width: clamp(50dvw, 50dvw, 500px);
        max-width: calc(100% - var(--largePadding));
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadowS);
    }
</style>
