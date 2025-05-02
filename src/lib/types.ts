// Types go here

export type GameState = {}

// Image Type
export type ImageType = {
    id: string
    turtle: string
    image_id: number
    taken: string
    orientation: string
    clarity: number
    width: number
    height: number
    image: string
    name: string | undefined
}

// Pair Type
export type Pair = {
    id: string
    images: ImageType[]
    difficulty: number
    difficultyType: 'easy' | 'med' | 'hard' | 'vHard' | 'random'
}

export type ImageCSVData = {
    image_id: number
    identity: string
    path: string
    date: string
    orientation: string
    clarity: number
    width: number
    height: number
}

export type GameType = {
    pairs: Pair[]
    random: ImageType
    ids: string[]
}

export type GameData = {
    rawIds: string[]
    images: PocketImageRecord
}

export type PocketImageRecord = {
    collectionId: string
    collectionName: string
    id: string
    expand: Expand
    image_num: number
    taken: string
    image: string
    orientation: string
    clarity: number
    width: number
    height: number
    created: string
    updated: string
    difficultyType: string
    name: string
    hero: string | null
    story: string | null
}

export type Expand = {
    turtle: PocketTurtleRecord
}

export type PocketTurtleRecord = {
    collectionId: string
    collectionName: string
    id: string
    hero: string[]
    stories: string[]
    name: string
    created: string
    updated: string
}
export type Guesses = {
    images: string[]
    correct: boolean
}
