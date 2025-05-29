import { GetGames } from '$lib/getGames.server'
import type { PageServerLoad } from './$types'


export const load: PageServerLoad = (async ({ params }) => {
    return await GetGames(params.id)
}) satisfies PageServerLoad
