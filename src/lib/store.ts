import { writable } from 'svelte/store'
import config from '$lib/config.json'
import type { PocketImageRecord, Guess } from './types'

//  Animiation Time in MS
export const animationTime = writable(300)

// Selection
export const selection = writable<PocketImageRecord[]>([])

// Current Game
export const currentGame = writable<{
    route: string
    game: PocketImageRecord[]
    gameHistory: Guess[]
    gameDate: string
}>({
    route: '',
    game: [],
    gameHistory: [],
    gameDate: '',
})

// solved
export const solved = writable<string[]>([])

// quesses
export const guesses = writable<number>(Number(config.guesses))

export const cheat = writable(false)

// PlayerID
export const playerId = writable<string>('')
