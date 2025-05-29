import allGames from '$lib/gameData/allGames.json'
import easyGames from '$lib/gameData/alleasyGames.json'
import medGames from '$lib/gameData/allmedGames.json'
import hardGames from '$lib/gameData/allhardGames.json'
import vHardGames from '$lib/gameData/allvHardGames.json'

import { randomIntFromInterval } from '$lib/Funcs'
import type { difficultyType, GameType, PocketImageRecord } from '$lib/types'
import { POCKET_PASS, POCKET_USER, POCKET_URL } from '$env/static/private'
import PocketBase from 'pocketbase'

export const GetGames = async (
    id: string | undefined,
    level: difficultyType
) => {
    let games: GameType[] = []
    console.log(level)

    // Get Games depending on level or not is asked for
    switch (level) {
        case undefined:
            games = allGames as GameType[]
            break
        case 'easy':
            games = easyGames as GameType[]
            break
        case 'med':
            games = medGames as GameType[]
            break
        case 'hard':
            games = hardGames as GameType[]
            break
        case 'vHard':
            games = vHardGames as GameType[]
            break
    }

    let game

    if (id) {
        // random game
        game = games[games.length % Number(id)]
    } else {
        // daily game
        const d = new Date()
        const t = d.getTime()
        const days = Math.floor(t / 86400000)
        let number = days % games.length
        game = games[number]
        console.log(number)
    }

    // Set up pocketbase instance (See env)
    const pb = new PocketBase(POCKET_URL)

    // Function for getting image urls
    const generateURL = (record: any, id: string) => {
        return pb.files.getURL(record, id)
    }

    // Login into Pocketbase (See env)
    const authData = await pb
        .collection('_superusers')
        .authWithPassword(POCKET_USER, POCKET_PASS)

    let images = []
    for (const [index, val] of game.ids.entries()) {
        const id = val
        let record = (await pb.collection('images').getOne(id, {
            expand: 'turtle',
        })) as PocketImageRecord
        const imgInfo = game.pairs.find((pair) => {
            return pair.id.includes(id)
        })
        if (imgInfo) {
            record.difficultyType = imgInfo.difficultyType
        } else {
            record.difficultyType = 'random'
        }
        // compute name
        record.name =
            record.expand.turtle.name ||
            'Unnamed Turtle ' + record.expand.turtle.id

        // get url of image
        record.image = generateURL(record, record.image)
        // compute hero image
        record.hero =
            record.expand.turtle.hero.length > 0
                ? generateURL(
                      record.expand.turtle,
                      record.expand.turtle.hero[
                          randomIntFromInterval(
                              0,
                              record.expand.turtle.hero.length - 1
                          )
                      ]
                  )
                : null

        // compute story
        record.story = record.expand.turtle.stories
            ? record.expand.turtle.stories[
                  randomIntFromInterval(
                      0,
                      record.expand.turtle.stories.length - 1
                  )
              ]
            : null

        // Used to distinguish images when they all have the same diffuliculty
        switch (true) {
            case level == undefined:
                record.styleDifficultyType = record.difficultyType
                break
            case index > 6:
                record.styleDifficultyType = 'vHard'
                break
            case index > 4:
                record.styleDifficultyType = 'hard'
                break
            case index > 2:
                record.styleDifficultyType = 'med'
                break
            case index > 0:
                record.styleDifficultyType = 'easy'
                break
            case index == 0:
                record.styleDifficultyType = 'random'
                break
        }
        console.log(record.styleDifficultyType, record.difficultyType)
        images.push(record)
    }
    return {
        images: images as PocketImageRecord[],
        rawIds: game.ids,
    }
}
