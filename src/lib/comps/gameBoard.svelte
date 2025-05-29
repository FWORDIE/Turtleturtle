<script lang="ts">
    import type { PocketImageRecord } from '$lib/types'
    import { page } from '$app/state'
    import { onMount } from 'svelte'
    import Image from './utils/Image.svelte'
    import ButtonBox from './utils/buttonBox.svelte'
    import Button from './utils/Button.svelte'
    import { flip } from 'svelte/animate'
    import {
        animationTime,
        selection,
        cheat,
        currentGame,
        playerId,
        solved,
    } from '$lib/store'
    import { fade, scale } from 'svelte/transition'
    import Board from './utils/board.svelte'
    import config from '$lib/config.json'
    import { createShareData, delay } from '$lib/Funcs'
    import Splash from './utils/Splash.svelte'
    import { postGames } from '$lib/postGame'
    import Hint from './utils/hint.svelte'

    let { images, rawIds }: { images: PocketImageRecord[]; rawIds: string[] } =
        $props()

    let recactiveImages = $state(images)
    // various pop up sates
    let matchPop = $state(false)
    let gameOverPop = $state(false)
    let gameWonPop = $state(false)
    let hintPop = $state(false)
    let ready = $state(false)
    let shareText = $state('Share')

    // used to animate wrong answers
    let incorrects: string[] = $state([])

    // used to highlight correct guesses
    let correctGuess: PocketImageRecord[] = $state([])

    const reset = () => {
        // Reset game history if not continuing
        if (page.url.pathname != $currentGame.route) {
            console.log('new game')
            $currentGame = {
                game: images,
                route: page.url.pathname,
                gameHistory: [],
            }
            $currentGame.gameHistory = []
            console.log(answers)
        }
        ready = false
        matchPop = false
        gameOverPop = false
        gameWonPop = false
        hintPop = false
        $selection = []
        shareText = 'Share'
    }

    // Derive number of answers
    const answers = $derived({
        wrong: $currentGame.gameHistory.filter((guess) => {
            return !guess.correct
        }).length,
        correct: $currentGame.gameHistory.filter((guess) => {
            return guess.correct
        }).length,
    })

    // shuffle images
    const shuffle = (images: PocketImageRecord[]) => {
        return images.sort(() => Math.random() - 0.5)
    }

    // show or hide hint screen
    const hintToggle = () => {
        hintPop = !hintPop
    }

    // copy share info
    const share = async () => {
        try {
            await navigator.clipboard.writeText(
                createShareData($currentGame.gameHistory) || ''
            )
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
            timeStamp: new Date().toISOString(),
        }
        // Info for History
        if ($selection[0].expand.turtle.id == $selection[1].expand.turtle.id) {
            correctGuess = [...$selection]
            guessData.correct = true
            matchPop = true
        } else {
            // Animate the incorrect answers
            incorrects = [$selection[0].id, $selection[1].id]
            await delay(2 * $animationTime)
            incorrects = []
        }

        $currentGame.gameHistory = [...$currentGame.gameHistory, guessData]
        $selection = []

        // Game End Info
        if (Number(config.guesses) - answers.wrong <= 0) {
            postGames($playerId, $currentGame.gameHistory, rawIds, false)
            gameOverPop = true
        }
    }

    // log answer history
    $effect(() => {
        console.log(answers)
    })

    // do this on launch
    onMount(() => {
        reset()
        recactiveImages = shuffle(images)
        ready = true
        recactiveImages = shuffle(images)
    })
</script>

{#key images}
    <!-- pop up for correctly matched pair -->
    {#if matchPop}
        <Splash>
            <div class="splashImageArea" class:split={!correctGuess[0].hero}>
                <!-- show hero image if present -->
                {#if correctGuess[0].hero}
                    <Image
                        image={correctGuess[0]}
                        hero={true}
                        cheat={true}
                        solved={false}
                        incorrect={false}
                    ></Image>
                {:else}
                    <!-- else show the pair -->

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
                        if (answers.correct >= 4) {
                            gameWonPop = true
                            postGames($playerId, $currentGame.gameHistory, rawIds, true)
                        }
                    }}>Keep Playing</Button
                >
            </ButtonBox>
        </Splash>
    {/if}
    <!-- pop up for game over -->
    {#if gameOverPop}
        <Splash>
            <h2>Game Over!</h2>
            <p>Unlucky, better luck next time!</p>
            <ButtonBox>
                <Button
                    clicked={() => {
                        gameOverPop = false
                    }}>View Board</Button
                >
            </ButtonBox>
        </Splash>
    {/if}
    <!-- pop up when game is won  -->
    {#if gameWonPop}
        <Splash>
            <h2>Congratulations!</h2>
            <p>You found all the matches!</p>
            <ButtonBox>
                <Button
                    clicked={() => {
                        gameWonPop = false
                    }}>View Board</Button
                >
            </ButtonBox>
        </Splash>
    {/if}
    <!-- pop up for hint and how to  -->
    {#if hintPop}
        <Hint bind:hintPop></Hint>
    {/if}

    <!-- game area  -->
    <div class="gameArea">
        {#if ready}
            <!-- hide hint text at end of game  -->
            {#if answers.wrong < 3 && answers.correct < 4}
                <Board>
                    <div class="guesses">Match all 4 pairs of turtles!</div>
                </Board>
            {/if}
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
                    <!-- display all game images  -->
                    {#each recactiveImages as image (image.id)}
                        <div
                            class="imageWrapper"
                            animate:flip={{ duration: $animationTime }}
                        >
                            <Image
                                {image}
                                solved={$currentGame.gameHistory.filter(
                                    (guess) => {
                                        return (
                                            guess.images.some((thisImageId) => {
                                                return (
                                                    thisImageId.id == image.id
                                                )
                                            }) && guess.correct
                                        )
                                    }
                                ).length > 0 ||
                                    answers.wrong >= 3 ||
                                    answers.correct >= 4}
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
                                    Number(config.guesses) - answers.wrong}
                            ></div>
                        {/each}
                    </div>
                </div>
            </Board>

            <ButtonBox>
                {#if !hintPop && !matchPop}
                    <Button url="/">Menu</Button>
                    {#if answers.correct >= 4 || answers.wrong >= 3}
                        <Button url="/random">Random Game</Button>
                        {#if page.url.pathname == '/daily'}
                            <Button style="orange" clicked={() => share()}
                                >{shareText}</Button
                            >
                        {/if}
                    {:else}
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
                    {/if}
                {/if}
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
