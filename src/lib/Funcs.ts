// Basic Funcs Go here
import moment from 'moment'
import type { Guess } from './types'
import type { guesses } from './store'

export function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const createShareData = (Guesses: Guess[]) => {
    if (Guesses.length < 1) {
        console.log('no data')
        return
    }

    const date = moment().format('DD/MM/YY')
    let emojis = {
        easy: '🟨',
        med: '🟦',
        hard: '🟪',
        vHard: '🟩',
        random: '⬜',
    }
    let string = '~~~~~~~~~~~~\n\n'
    string += 'TurtleTurtle\n'
    string += '  ' + date + '  \n\n'
    if (Guesses.length < 5) {
        string += '  '
    } else {
        string += ''
    }
    Guesses.forEach((guess) => {
        string += emojis[guess.images[0].difficultyType]
    })
    string += '\n'
    if (Guesses.length < 5) {
        string += '    '
    } else {
        string += '  '
    }
    Guesses.forEach((guess) => {
        string += emojis[guess.images[1].difficultyType]
    })
    string += '\n\n~~~~~~~~~~~~'
    return string
}
