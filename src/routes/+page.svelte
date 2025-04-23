<script lang="ts">
    import Board from '$lib/comps/utils/board.svelte'
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import Splash from '$lib/comps/utils/Splash.svelte'
</script>

<Board>The daily game about matching Sea Turtles!!!</Board>

<ButtonBox>
    <Button url="/daily" style="orange">Play Daily!</Button>
    <Button url="/random">Play Random</Button>
    <Button url="/about">About</Button>
</ButtonBox>

<style lang="scss">

</style>
