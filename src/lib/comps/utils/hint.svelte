<script lang="ts">
    import Board from './board.svelte'
    import Splash from './Splash.svelte'
    import config from '$lib/config.json'
    import ButtonBox from './buttonBox.svelte'
    import Button from './Button.svelte'
    import Padding from './padding.svelte'

    let { hintPop = $bindable() } = $props()
</script>

<Splash>
    {@html config.hint}
    <Board>Easy: 🟨, Medium: 🟦, Hard: 🟪, Expert: 🟩, Random: ⬜</Board>
    <Padding num={2}></Padding>

    <ButtonBox>
        <Button
            clicked={() => {
                hintPop = false
            }}
        >
            Close</Button
        >
    </ButtonBox>
</Splash>

<style lang="scss">
</style>
