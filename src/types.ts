export interface CastGroupMember {
  name: string
  gender?: string
  role?: string
  isGroup?: boolean
}

export interface CastMember {
  name?: string
  gender?: string // 'm' | 'f' | 'u' throws an error
  role?: string
  isGroup?: boolean
  group?: CastGroupMember[]
}

export interface Edition {
  title: string
  url?: string
}

export interface Author {
  name?: string
  pseudonym?: string
  wikidata?: string
}

export interface Coords {
  longitude: number
  latitude: number
}

export interface Dict {
  name: string
  pages?: string
  url?: string
}

export interface Play {
  author?: Author
  authors?: Author[]
  slug: string
  title: string

  basedOn?: (string | OriginalPlay)[]
  basedOnLanguage?: string
  cast?: CastMember[]
  comments?: string[]
  created?: number
  editions?: Edition[]
  dictionaries?: Dict[]
  formalia?: string[]
  ids?: {
    dracor?: string
    wikidata?: string
    weber?: string
  }
  keywords?: string[]
  normalizedYear?: number
  numberOfCharacters?: number
  numberOfScenes?: number
  premiered?: string | number
  printed?: number
  reviews?: string[]
  setting?: string
  location?: {
    wikidataId: string
    coordinates?: Coords
  } | {
    coordinates: Coords
    wikidataId?: string
  }
  subtitle?: string
}

export interface OriginalPlay {
  id: string
  author?: Author
  authors?: Author[]
  title: string
  subtitle?: string
  language?: string
  created?: number
  printed?: number
  premiered?: string | number
  normalizedYear?: number
  fulltextUrl?: string
  ids?: {
    dracor?: string
    wikidata?: string
  }
  numTranslations?: number
}
