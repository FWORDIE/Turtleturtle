import { POCKET_PASS, POCKET_USER, POCKET_URL } from '$env/static/private'
import PocketBase from 'pocketbase'
import { json } from '@sveltejs/kit'

export async function POST({request}) {
    const { data } = await request.json()
    // Set up pocketbase instance (See env)
    const pb = new PocketBase(POCKET_URL)
    // Login into Pocketbase (See env)
    const authData = await pb
        .collection('_superusers')
        .authWithPassword(POCKET_USER, POCKET_PASS)
    //create record
    const record = await pb.collection('completed_games').create(data)
    return json(record)
}
