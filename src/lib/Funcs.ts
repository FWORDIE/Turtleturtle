// Basic Funcs Go here
import moment from 'moment'
import type { Guess } from './types'

export function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min
}

export function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const addSpaces = (string: string) => {
    let maxSpaces = 'TurtleTurtle'.length
    let stringLen = string.length
    let spaceNeed = Math.floor((maxSpaces - stringLen) / 2)
    let space = ''
    for (let x = 0; x < spaceNeed; x++) {
        space += ' '
    }
    return space + string + space
}

export const createShareData = (guesses: Guess[]) => {
    if (guesses.length < 1) {
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
    string += addSpaces(date) + '\n'
    let start = moment(guesses[0].timeStamp)
    let end = moment(guesses[guesses.length - 1].timeStamp)
    let duration = moment.duration(end.diff(start))
    let seconds = duration.asSeconds().toFixed(1)
    let timeString =  seconds + 's'
    string += addSpaces(timeString) + '\n\n'
    let guessLineOne = ''
    guesses.forEach((guess) => {
        guessLineOne += emojis[guess.images[0].difficultyType]
    })
    string += addSpaces(guessLineOne) + '\n'
    let guessLineTwo = ''

    guesses.forEach((guess) => {
        guessLineTwo += emojis[guess.images[1].difficultyType]
    })
    string += addSpaces(guessLineTwo) + '\n'

    string += '\n~~~~~~~~~~~'
    return string
}
