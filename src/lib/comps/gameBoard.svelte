<script lang="ts">
    import type { PocketImageRecord } from '$lib/types'
    import { onMount } from 'svelte'
    import Image from './utils/Image.svelte'
    import ButtonBox from './utils/buttonBox.svelte'
    import Button from './utils/Button.svelte'
    import { flip } from 'svelte/animate'
    import {
        animationTime,
        gameHistory,
        guesses,
        selection,
        cheat,
    } from '$lib/store'
    import { fade, scale } from 'svelte/transition'
    import Board from './utils/board.svelte'
    import config from '$lib/config.json'
    import { createShareData, delay } from '$lib/Funcs'
    import Splash from './utils/Splash.svelte'

    let { images }: { images: PocketImageRecord[] } = $props()

    let recactiveImages = $state(images)

    let matchPop = $state(false)
    let gameOverPop = $state(false)
    let gameWonPop = $state(false)
    let ready = $state(false)
    let shareText = $state('Share')
    let incorrects: string[] = $state([])
    let correctGuess: PocketImageRecord[] = $state([])


    const reset = () => {
        ready =false
        matchPop = false
        gameOverPop = false
        gameWonPop = false
        $gameHistory = []
        $selection = []
        shareText = 'Share'
    }
    // shuffle images
    const shuffle = (images: PocketImageRecord[]) => {
        return images.sort(() => Math.random() - 0.5)
    }

    const hintToggle = () => {
        console.log('hint')
    }

    const share = async () => {
        try {
            await navigator.clipboard.writeText(createShareData($gameHistory) || '')
            console.log('Content copied to clipboard')
            shareText = 'Copied'
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    const submit = async () => {
        // Object for history
        const guessData = {
            images: $selection,
            correct: false,
            timeStamp: new Date().toString(),
        }
        // Info for History
        if ($selection[0].expand.turtle.id == $selection[1].expand.turtle.id) {
            correctGuess = [...$selection]
            guessData.correct = true
            console.log(correctGuess)
            matchPop = true
        } else {
            // Animate the incorrect answers
            incorrects = [$selection[0].id, $selection[1].id]
            await delay(2 * $animationTime)
            incorrects = []
        }

        $gameHistory = [...$gameHistory, guessData]
        $selection = []

        // Game End Info
        if (
            Number(config.guesses) -
                $gameHistory.filter((guess) => {
                    return !guess.correct
                }).length ==
            0
        ) {
            gameOverPop = true
            console.log($gameHistory)
        }
        console.log(
            Number(config.guesses) -
                $gameHistory.filter((guess) => {
                    return !guess.correct
                }).length
        )
    }

    onMount(() => {
        reset()
        recactiveImages = shuffle(images)
        ready = true
        recactiveImages = shuffle(images)
    })
</script>

{#key images}
    {#if matchPop}
        <Splash>
            <div class="splashImageArea" class:split={!correctGuess[0].hero}>
                {#if correctGuess[0].hero}
                    <Image
                        image={correctGuess[0]}
                        hero={true}
                        cheat={true}
                        solved={false}
                        incorrect={false}
                    ></Image>
                {:else}
                    {#each correctGuess as guess}
                        <div class="imageWrapper">
                            <Image
                                image={guess}
                                hero={true}
                                cheat={true}
                                solved={false}
                                incorrect={false}
                            ></Image>
                        </div>
                    {/each}
                {/if}
            </div>
            <h2>Match Found!</h2>
            <p>Well Done, you found {correctGuess[0].name}</p>
            {#if correctGuess[0].story}
                <p>{correctGuess[0].story}</p>
            {/if}

            <ButtonBox>
                <Button
                    clicked={() => {
                        matchPop = false
                        if (
                            $gameHistory.filter((guess) => {
                                return guess.correct
                            }).length == 4
                        ) {
                            gameWonPop = true
                            console.log($gameHistory)
                        }
                    }}>Keep Playing</Button
                >
            </ButtonBox>
        </Splash>
    {/if}
    {#if gameOverPop}
        <Splash>
            <h2>Game Over!</h2>
            <p>Unlucky, better luck next time!</p>
            <ButtonBox>
                <Button url="/">Home</Button>
                <Button url="/random">Random Game</Button>
                <Button
                    clicked={() => {
                        gameOverPop = false
                    }}>View</Button
                >
                <Button
                    clicked={() => {
                        share()
                    }}>Share</Button
                >
            </ButtonBox>
        </Splash>
    {/if}
    {#if gameWonPop}
        <Splash>
            <h2>Congratulations!</h2>
            <p>You found all the matches!</p>
            <ButtonBox>
                <Button url="/">Home</Button>
                <Button url="/random">Random Game</Button>
                <Button
                    clicked={() => {
                        gameWonPop = false
                    }}>View</Button
                >
            </ButtonBox>
        </Splash>
    {/if}
    <div class="gameArea">
        {#if ready}
            <Board>
                <div class="guesses">Match all 4 pairs of turtles!</div>
            </Board>
            <div
                class="imageAreaWrapper"
                in:scale|global={{
                    duration: $animationTime,
                    delay: $animationTime,
                    opacity: 0,
                    start: 1.5,
                }}
                out:fade|global={{ duration: $animationTime / 2 }}
            >
                <div class="imageArea">
                    {#each recactiveImages as image (image.id)}
                        <div
                            class="imageWrapper"
                            animate:flip={{ duration: $animationTime }}
                        >
                            <Image
                                {image}
                                solved={$gameHistory.filter((guess) => {
                                    return (
                                        guess.images.some((thisImageId) => {
                                            return thisImageId.id == image.id
                                        }) && guess.correct
                                    )
                                }).length > 0 ||
                                    Number(config.guesses) -
                                        $gameHistory.filter((guess) => {
                                            return !guess.correct
                                        }).length ==
                                        0 ||
                                    $gameHistory.filter((guess) => {
                                        return guess.correct
                                    }).length == 4}
                                incorrect={incorrects.includes(image.id)}
                                hero={false}
                                cheat={$cheat}
                            ></Image>
                        </div>
                    {/each}
                </div>
            </div>
            <Board>
                <div class="guesses">
                    Mistakes Remaining:
                    <div class="dots">
                        {#each { length: Number(config.guesses) }, rank}
                            <div
                                class="dot"
                                class:failed={rank >=
                                    Number(config.guesses) -
                                        $gameHistory.filter((guess) => {
                                            return !guess.correct
                                        }).length}
                            ></div>
                        {/each}
                    </div>
                </div>
            </Board>

            <ButtonBox>
                <Button url="/">Menu</Button>
                <Button clicked={() => hintToggle()}>Hint</Button>
                <Button
                    clicked={() => {
                        recactiveImages = shuffle(images)
                    }}>Shuffle</Button
                >
                <Button
                    clicked={() => submit()}
                    disabled={$selection.length < 2}
                    style="orange">Submit</Button
                >
  
            </ButtonBox>
        {/if}
    </div>
{/key}

<style lang="scss">
    .gameArea {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--extraLargePadding);
        width: 100%;
        .imageAreaWrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: calc(100% + var(--largePadding));
            .imageArea {
                display: grid;
                grid-template-columns: repeat(
                    auto-fill,
                    minmax(calc(30% - var(--padding)), 1fr)
                );
                width: 100%;
                gap: var(--padding);

                .imageWrapper {
                    position: relative;
                    // border: 1px solid;
                    box-sizing: border-box;
                }

                .imageWrapper::before {
                    content: '';
                    display: block;
                    padding-top: 100%;
                }
            }
        }

        .guesses {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--halfPadding);

            .dots {
                display: flex;
                gap: var(--quatPadding);
                .dot {
                    width: var(--padding);
                    height: var(--padding);
                    background-color: var(--orange);
                    border-radius: var(--padding);
                    &.failed {
                        background-color: var(--black);
                    }
                }
            }
        }
    }
    .splashImageArea {
        position: relative;
        height: 25dvh;
        margin-bottom: var(--largePadding);
        width: 100%;
        display: flex;
        .imageWrapper {
            position: relative;
            // border: 1px solid;
            box-sizing: border-box;
        }
        .imageWrapper::before {
            content: '';
            display: block;
            padding-top: 100%;
        }

        &.split {
            display: grid;
            height: auto;
            margin-bottom: var(--padding);

            grid-template-columns: repeat(
                auto-fill,
                minmax(calc(50% - var(--padding)), 1fr)
            );
            gap: var(--padding);
        }
    }
</style>
