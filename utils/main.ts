import { parse, stringify } from 'jsr:@std/csv'
import { walk } from 'https://deno.land/std@0.170.0/fs/walk.ts'
import 'jsr:@std/dotenv/load'
import PocketBase from 'pocketbase'
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
const pb = new PocketBase(Deno.env.get('POCKET_URL'))

// Login into Pocketbase (See env)
const authData = await pb
    .collection('_superusers')
    .authWithPassword(
        Deno.env.get('POCKET_USER') || 'test',
        Deno.env.get('POCKET_PASS') || 'test'
    )

// This Function uploads all data to the pocketbase
if (import.meta.main) {
    // construct a list of folders that have hero images
    let folders: string[] = []
    for await (const walkEntry of walk('Archive turtle/Poster photos')) {
        const type = walkEntry.isSymlink
            ? 'symlink'
            : walkEntry.isFile
              ? 'file'
              : 'directory'

        if (type == 'directory') {
            folders.push(walkEntry.path)
        }
    }

    // parse csv file for all turtles to upload
    const data = parse(
        await Deno.readTextFile('Archive turtle/Ids-Names.csv'),
        {
            columns: ['id', 'name'],
        }
    )

    // construct data to upload for each csv entry
    for (let x = 0; x < data.length; x++) {
        const file = {
            id: data[x].id,
            story: 'test',
            name: data[x].name,
            hero: [] as Blob[],
        }

        // checks if there are hero images to upload
        for (let folder of folders) {
            if (folder.includes(file.id)) {
                for await (const walkEntry of walk(folder)) {
                    const type = walkEntry.isSymlink
                        ? 'symlink'
                        : walkEntry.isFile
                          ? 'file'
                          : 'directory'
                    if (type == 'file') {
                        const data = await Deno.readFile(walkEntry.path)
                        const blob = new Blob([data])
                        file.hero.push(blob)
                    }
                }
            }
        }

        //uploads to pocket base
        const response = pb
            .collection('turtles')
            .create(file, { $autoCancel: false })

        // Delay becuase Pocketbase was struggling
        await delay(100)
    }
}
