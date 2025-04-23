<script lang="ts">
    type style = 'default' | 'orange'
    type url = string | undefined

    let {
        clicked = undefined,
        style: style = 'default',
        disabled = false,
        url: url,
        children,
    } = $props()
</script>

{#if !url}
    <button onclick={clicked} class={style} {disabled}>
        {@render children()}
    </button>
{:else}
    <a href={url} class={style}> {@render children()} </a>
{/if}

<style lang="scss">
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
        transition: box-shadow 100ms,transform 100ms;
        &.orange {
            background-color: var(--orange);
            color: var(--white);
            border-color: var(--white);
        }

        &:hover{
            box-shadow: var(--shadowS);
            transform: translate(0px, 2px);
        }
    }
    button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    a {
        text-decoration: none;
    }
</style>
