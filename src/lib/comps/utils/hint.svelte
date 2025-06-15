<script lang="ts">
    import Board from './board.svelte'
    import Splash from './Splash.svelte'
    import ButtonBox from './buttonBox.svelte'
    import Button from './Button.svelte'
    import Padding from './padding.svelte'

    let { hintPop = $bindable() } = $props()
</script>

<Splash>
    <h2>How To Play</h2>
    <p>
        Your aim is to find the 4 pairs of images for 4 Turtles in the puzzle.
    </p>
    <p>
        Select 2 images you think show the same turtle and tap 'Submit' to check
        your guess.
    </p>
    <p>Find all four Turtle pairs without making 3 mistakes!</p>
    <h2>Hint</h2>
    <p>
        Turtle faces (left/right/top side) each have a unique pattern of scales,
        like fingerprints. Look for these!
    </p>
    <p>
        The patterns in opposite profiles are not exactly the same in a Turtle
        yet rather similar. Look for these similarities as well!
    </p>
    <p>Each daily game has 4 pair of difficulties and one random wildcard.</p>
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
