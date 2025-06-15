<script lang="ts">
    import Board from '$lib/comps/utils/board.svelte'
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import { currentGame } from '$lib/store'
</script>

<Board>The daily game about matching Sea Turtles!!!</Board>

<ButtonBox>
    <Button
        url="/daily"
        style={$currentGame.game.length > 0 ? undefined : 'orange'}
        >Play Daily</Button
    >
    <Button url="/random">Play Random</Button>
    <Button url="/about">About</Button>
    {#if $currentGame.game.length > 0}
        <Button url={$currentGame.route} style="orange">Continue</Button>
    {/if}
</ButtonBox>

<style lang="scss">
</style>
