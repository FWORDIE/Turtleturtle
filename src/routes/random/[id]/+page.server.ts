import type { PageServerLoad } from './$types'
import allGames from '$lib/allGames.json'
import { randomIntFromInterval } from '$lib/Funcs'
import type { GameType, PocketImageRecord } from '$lib/types'
import { POCKET_PASS, POCKET_USER,POCKET_URL } from '$env/static/private'
import PocketBase from 'pocketbase'

export const load: PageServerLoad = (async ({ params }) => {
    console.log( POCKET_PASS, POCKET_USER,POCKET_URL )
    console.log('hi')
    // Get aLL Games From ARRAY
    const games = allGames as GameType[]
    let game = games[games.length % Number(params.id)]

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
    for (let id of game.ids) {
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
        record.story =
            record.expand.turtle.stories
                ? record.expand.turtle.stories[
                      randomIntFromInterval(
                          0,
                          record.expand.turtle.stories.length - 1
                      )
                  ]
                : null

        images.push(record)
    }
    return {
        rawIds: game.ids as string[],
        images: images as PocketImageRecord[],
    }
}) satisfies PageServerLoad
