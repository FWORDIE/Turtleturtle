<script lang="ts">
    import { getRandomArbitrary } from '$lib/Funcs'
    import { selection } from '$lib/store'
    import type { PocketImageRecord, PocketTurtleRecord } from '$lib/types'

    let {
        image,
        solved = true,
        incorrect = false,
        cheat = true,
        hero = false,
    }: {
        image: PocketImageRecord
        solved: boolean 
        incorrect: boolean 
        cheat: boolean
        hero: boolean 
    } = $props()

    let rotation = getRandomArbitrary(-3, 3).toFixed(2)

    const select = (id: PocketImageRecord) => {
        if (solved || hero) {
            return true
        }

        if ($selection.indexOf(id) > -1) {
            $selection = $selection.filter((thisId) => {
                return thisId != id
            })
            return
        }
        if ($selection.length > 1) {
            $selection = $selection.slice(1, 2)
        }
        $selection = [...$selection, id]
    }
</script>

<button
    class="imageButton"
    class:selected={$selection.some((thisImage) => {
        return thisImage.id == image.id
    })}
    onclick={() => select(image)}
    class:hero
>
    <img
        src={hero && image.hero ? image.hero : image.image}
        alt=""
        class="image"
        class:incorrect
        class:solved
        
        style="transform: rotate({rotation}deg);
            border-color:var(--{solved || cheat
            ? image.styleDifficultyType
            : $selection.some((thisImage) => {
                    return thisImage.id == image.id
                })
              ? 'orange'
              : 'random'})"
    />
</button>

<style lang="scss">
    .imageButton {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: initial;
        border: none;
        z-index: 5;
        transition: scale var(--animationTime);
        img {
            transition: box-shadow var(--animationTime);
            max-width: 100%;
            max-height: 100%;
            border: var(--white) var(--halfPadding) solid;
            box-shadow: var(--shadowS);
            &.incorrect {
                animation: tilt-shaking 0.25s infinite;
            }
            &.solved {
                scale: 0.8;
            }
        }

        &.selected {
            scale: 1.2;
            z-index: 10;
            img {
                box-shadow: var(--shadowM);
                border: var(--orange) var(--halfPadding) solid;
            }
        }
        &.hero{
            pointer-events: none;
        }
    }
    @keyframes tilt-shaking {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(5deg);
        }
        50% {
            transform: rotate(0eg);
        }
        75% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>
