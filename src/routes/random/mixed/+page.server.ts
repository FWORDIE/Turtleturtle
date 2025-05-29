import { redirect } from '@sveltejs/kit'
import allGames from '$lib/gameData/allGames.json'
import { randomIntFromInterval } from '$lib/Funcs'
import type { GameType } from '$lib/types'

// Reroutes to random game page
export function load() {
    // Get aLL Games From ARRAY
    const games = allGames as GameType[]
    let game = randomIntFromInterval(0, games.length - 1)
    redirect(307, 'mixed/' + game)
}
