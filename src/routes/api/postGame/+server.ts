import { POCKET_PASS, POCKET_USER, POCKET_URL } from '$env/static/private'
import PocketBase from 'pocketbase'
import { json } from '@sveltejs/kit'

export async function POST({ request }) {
    const { data } = await request.json()
    // Set up pocketbase instance (See env)
    const pb = new PocketBase(POCKET_URL)
    // Login into Pocketbase (See env)
    const authData = await pb
        .collection('_superusers')
        .authWithPassword(POCKET_USER, POCKET_PASS)

    // create Id if not present
    try {
        const idCheck = await pb
            .collection('players')
            .create({ id: data.playerId })
    } catch {
        console.log('error creating ID')
    }

    // create game record
    const record = await pb.collection('completed_games').create(data)

    // update id to refrence it
    const idRelation = await pb.collection('players').update(data.playerId, {
        '+games': record.id,
    })

    return json(record)
}
