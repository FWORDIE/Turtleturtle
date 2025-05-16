import { writable } from 'svelte/store'
import config from '$lib/config.json'
import type { PocketImageRecord, Guess } from './types'

//  Animiation Time in MS
export const animationTime = writable(300)

// Selection
export const selection = writable<PocketImageRecord[]>([])

// solved
export const solved = writable<string[]>([])

// quesses
export const guesses = writable<number>(Number(config.guesses))

// history object to upload
export const gameHistory = writable<Guess[]>([])

export const cheat = writable(false)
