import type { completedGameData, Guess } from './types.js'

export const postGames = async (
    playerId: string,
    guesses: Guess[],
    imageIds: string[],
    solved: boolean
) => {
    const data: completedGameData = {
        playerId: playerId,
        imageIds: imageIds,
        timeStart: guesses[0].timeStamp,
        timeEnd: guesses[guesses.length - 1].timeStamp,
        solved: solved,
        guesses: guesses,
    }
    console.log(data)
    fetch('/api/postGame', {
        method: 'POST',
        body: JSON.stringify({data}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
