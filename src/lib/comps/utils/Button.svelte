<script lang="ts">
    type style = 'default' | 'orange'
    type url = string | null

    let {
        clicked = null,
        style: style = 'default',
        disabled = false,
        url: url = null,
        children,
    } = $props()
</script>

{#if !url}
    <button onclick={clicked} class={style} {disabled} class:disabled>
        {@render children()}
    </button>
{:else}
    <a href={url} class="{style}" class:disabled >{@render children()}</a>
{/if}

<style lang="scss">
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    button,
    a {
        --textColour: var(--black);
        --buttonColour: var(--white);
        padding: calc(0.75 * var(--padding)) var(--padding);
        background-color: var(--buttonColour);
        margin: 0;
        display: inline-block;
        border-radius: var(--largePadding);
        border: solid 2px var(--textColour);
        box-shadow: var(--shadowM);
        color: var(--textColour);
        transition:
            box-shadow var(--animationTime),
            transform var(--animationTime);

        &:hover {
            box-shadow: var(--shadowS);
            transform: translate(0px, 2px);
        }
    }

    a {
        text-decoration: none;
    }

    :global(button.orange, a.orange) {
        background-color: var(--orange);
        color: var(--white);
        border-color: var(--white);
    }

    :global(button.disabled, a.disabled) {
        box-shadow: var(--shadowS);
        opacity: 0.5;
    }
</style>
