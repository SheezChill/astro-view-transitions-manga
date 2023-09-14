import { Union2Tuple } from './utils.js'

interface AtHomeResponse {
  result: string
  baseUrl: string
  chapter: {
    hash: string
    data: string[]
    dataSaver: string[]
  }
}

declare class AtHomeEndpoint {
  private baseURL
  private fetcher
  constructor(baseURL: string)
  get(chapterID: string): Promise<AtHomeResponse>
}

type Locales = [
  {
    name: 'English'
    two_letter: 'en'
    three_letter: 'eng'
  },
  {
    name: 'Japanese'
    two_letter: 'ja'
    three_letter: 'jpn'
  },
  {
    name: 'Japanese (Romaji)'
    two_letter: 'ja-ro'
    three_letter: 'jpn'
  },
  {
    name: 'Polish'
    two_letter: 'pl'
    three_letter: 'pol'
  },
  {
    name: 'Serbo-Croatian'
    two_letter: 'sh'
    three_letter: 'hrv'
  },
  {
    name: 'Dutch'
    two_letter: 'nl'
    three_letter: 'dut'
  },
  {
    name: 'Italian'
    two_letter: 'it'
    three_letter: 'ita'
  },
  {
    name: 'Russian'
    two_letter: 'ru'
    three_letter: 'rus'
  },
  {
    name: 'German'
    two_letter: 'de'
    three_letter: 'ger'
  },
  {
    name: 'Hungarian'
    two_letter: 'hu'
    three_letter: 'hun'
  },
  {
    name: 'French'
    two_letter: 'fr'
    three_letter: 'fre'
  },
  {
    name: 'Finnish'
    two_letter: 'fi'
    three_letter: 'fin'
  },
  {
    name: 'Vietnamese'
    two_letter: 'vi'
    three_letter: 'vie'
  },
  {
    name: 'Greek'
    two_letter: 'el'
    three_letter: 'gre'
  },
  {
    name: 'Bulgarian'
    two_letter: 'bg'
    three_letter: 'bul'
  },
  {
    name: 'Spanish (Es)'
    two_letter: 'es'
    three_letter: 'spa'
  },
  {
    name: 'Portuguese (Br)'
    two_letter: 'pt-br'
    three_letter: 'por'
  },
  {
    name: 'Portuguese (Pt)'
    two_letter: 'pt'
    three_letter: 'por'
  },
  {
    name: 'Swedish'
    two_letter: 'sv'
    three_letter: 'swe'
  },
  {
    name: 'Arabic'
    two_letter: 'ar'
    three_letter: 'ara'
  },
  {
    name: 'Danish'
    two_letter: 'da'
    three_letter: 'dan'
  },
  {
    name: 'Chinese (Simp)'
    two_letter: 'zh'
    three_letter: 'chi'
  },
  {
    name: 'Chinese (Romaji)'
    two_letter: 'zh-ro'
    three_letter: 'chi'
  },
  {
    name: 'Bengali'
    two_letter: 'bn'
    three_letter: 'ben'
  },
  {
    name: 'Romanian'
    two_letter: 'ro'
    three_letter: 'rum'
  },
  {
    name: 'Czech'
    two_letter: 'cs'
    three_letter: 'cze'
  },
  {
    name: 'Mongolian'
    two_letter: 'mn'
    three_letter: 'mon'
  },
  {
    name: 'Turkish'
    two_letter: 'tr'
    three_letter: 'tur'
  },
  {
    name: 'Indonesian'
    two_letter: 'id'
    three_letter: 'ind'
  },
  {
    name: 'Korean'
    two_letter: 'ko'
    three_letter: 'kor'
  },
  {
    name: 'Korean (Romaji)'
    two_letter: 'ko-ro'
    three_letter: 'kor'
  },
  {
    name: 'Spanish (LATAM)'
    two_letter: 'es-la'
    three_letter: 'spa'
  },
  {
    name: 'Persian'
    two_letter: 'fa'
    three_letter: 'per'
  },
  {
    name: 'Malay'
    two_letter: 'ms'
    three_letter: 'may'
  },
  {
    name: 'Thai'
    two_letter: 'th'
    three_letter: 'tha'
  },
  {
    name: 'Catalan'
    two_letter: 'ca'
    three_letter: 'cat'
  },
  {
    name: 'Filipino'
    two_letter: 'tl'
    three_letter: 'fil'
  },
  {
    name: 'Chinese (Trad)'
    two_letter: 'zh-hk'
    three_letter: 'chi'
  },
  {
    name: 'Ukrainian'
    two_letter: 'uk'
    three_letter: 'ukr'
  },
  {
    name: 'Burmese'
    two_letter: 'my'
    three_letter: 'bur'
  },
  {
    name: 'Lithuanian'
    two_letter: 'lt'
    three_letter: 'lit'
  },
  {
    name: 'Hebrew'
    two_letter: 'he'
    three_letter: 'heb'
  },
  {
    name: 'Hindi'
    two_letter: 'hi'
    three_letter: 'hin'
  },
  {
    name: 'Norwegian'
    two_letter: 'no'
    three_letter: 'nor'
  },
  {
    name: 'Latin'
    two_letter: 'la'
    three_letter: 'lat'
  },
  {
    name: 'Kazakh'
    two_letter: 'kk'
    three_letter: 'kaz'
  },
  {
    name: 'Tamil'
    two_letter: 'ta'
    three_letter: 'tam'
  },
  {
    name: 'Croatian'
    two_letter: 'hr'
    three_letter: 'hrv'
  },
  {
    name: 'Esperanto'
    two_letter: 'eo'
    three_letter: 'epo'
  },
  {
    name: 'Estonian'
    two_letter: 'et'
    three_letter: 'est'
  },
  {
    name: 'Nepali'
    two_letter: 'ne'
    three_letter: 'nep'
  },
  {
    name: 'Serbian'
    two_letter: 'sr'
    three_letter: 'srp'
  }
]
type TwoLetterLocale = Pick<Locales[number], 'two_letter'>['two_letter']

type Mode = 'and' | 'or'
type OrderValue$1 = 'asc' | 'desc'
type ContentRating$1 = 'safe' | 'suggestive' | 'erotica' | 'pornographic'
type MangaStatus = 'ongoing' | 'completed' | 'hiatus' | 'cancelled'
type MangaDemographic = 'shounen' | 'shoujo' | 'josei' | 'seinen'
type RelationshipList$1 = 'author' | 'artist' | 'cover_art'
interface MangaQueries {
  title?: string
  limit?: number
  offset?: number
  authorOrArtist?: string
  contentRating?: ContentRating$1[]
  includes?: RelationshipList$1[]
  authors?: string[]
  artists?: string[]
  year?: number
  includedTags?: string[]
  includeTagsMode?: Mode
  excludedTags?: string[]
  excludedTagsMode?: Mode
  status?: MangaStatus[]
  originalLanguage?: TwoLetterLocale[]
  excludedOriginalLanguage?: string[]
  availableTranslatedLanguage?: string[]
  publicationDemographic?: MangaDemographic[]
  ids?: string[]
  createdAtSince?: Date | string
  updatedAtSince?: Date
  hasAvailableChapters?: boolean
  group?: string
  order?: {
    title?: OrderValue$1
    year?: OrderValue$1
    createdAt?: OrderValue$1
    updatedAt?: OrderValue$1
    latestUploadedChapter?: OrderValue$1
    followedCount?: OrderValue$1
    relevance?: OrderValue$1
    rating?: OrderValue$1
  }
}
interface RandomMangaQueries {
  includes?: RelationshipList$1[]
  contentRating?: ContentRating$1[]
  includedTags?: string[]
  includedTagsMode?: Mode
  excludedTags?: string[]
  exculdedTagsMode?: Mode
}
type MangaContent = {
  id: string
  type: 'manga'
  attributes: {
    title: Record<TwoLetterLocale, string>
    altTitles: Record<TwoLetterLocale, string>[]
    description: Record<TwoLetterLocale, string>
    isLocked: boolean
    links: Record<string, string>
    originalLanguage: TwoLetterLocale
    lastVolume: string
    lastChapter: string
    publicationDemographic: MangaDemographic
    status: MangaStatus
    year?: number
    contentRating: string
    tags: {
      id: string
      type: 'tag'
      attributes: {
        name: Record<TwoLetterLocale, string>
        description: {}
        group: 'theme' | 'genre'
        version: number
      }
      relationships: []
    }[]
    state: string
    chapterNumbersResetOnNewVolume: boolean
    createdAt: string
    updatedAt: string
    version: number
    availableTranslatedLanguages: TwoLetterLocale[]
    latestUploadedChapter: string[]
  }
  relationships: {
    id: string
    type: RelationshipList$1
  }[]
}
interface MangaResponse {
  result: string
  response: string
  data: MangaContent
}
interface CreatorAttributes {
  name: string
  imageUrl: string
  twitter: string
  pixiv: string
  melonBook: string
  fanBox: string
  booth: string
  nicoVideo: string
  skeb: string
  fantia: string
  tumblr: string
  youtube: string
  weibo: string
  naver: string
  website: string
  createdAt: string
  updatedAt: string
  version: number
}
interface FilledRelationship$1 {
  author: {
    id: string
    type: 'author'
    attributes: CreatorAttributes
  }
  artist: {
    id: string
    type: 'artist'
    attributes: CreatorAttributes
  }
  cover_art: {
    id: string
    type: 'cover_art'
    attributes: {
      description: string
      volume: string
      fileName: string
      locale: TwoLetterLocale
      createdAt: string
      udpatedAt: string
      version: number
    }
  }
}
type EmptyRelationship$1 = [
  {
    id: string
    type: 'author'
  },
  {
    id: string
    type: 'artist'
  },
  {
    id: string
    type: 'cover_art'
  }
]
type WithRelationships$1<T extends RelationshipList$1> = {
  relationships: Union2Tuple<
    | Exclude<
        EmptyRelationship$1[number],
        {
          type: T
        }
      >
    | FilledRelationship$1[T]
  >
}
export type MangaWithRelationship<T extends RelationshipList$1> = {
  result: string
  response: string
  data: Omit<MangaContent, 'relationships'> & WithRelationships$1<T>
}
export type MangaArray<T extends RelationshipList$1> = {
  result: string
  response: string
  data: (Omit<MangaContent, 'relationships'> & WithRelationships$1<T>)[]
  limit: number
  offset: number
  total: number
}
interface FeedResponse {
  result: string
  response: string
  limit: number
  offset: number
  total: number
  data: ChapterContent[]
}
interface FeedResponseWithRelationship<T extends RelationshipList> {
  result: string
  response: string
  limit: number
  offset: number
  total: number
  data: (ChapterContent & WithRelationships<T>)[]
}
interface FeedQueries {
  limit?: number
  offset?: number
  translatedLanguage?: TwoLetterLocale[]
  originalLanguage?: TwoLetterLocale[]
  excludedOriginalLanguage?: TwoLetterLocale[]
  contentRating?: ContentRating$1[]
  excludedGroups?: string[]
  excludedUploaders?: string[]
  includeFutureUpdates?: 0 | 1
  createdAtSince?: string
  updatedAtSince?: string
  publishedAtSince?: string
  order?: {
    createdAt?: OrderValue$1
    updatedAt?: OrderValue$1
    publishAt?: OrderValue$1
    readableAt?: OrderValue$1
    volume?: OrderValue$1
    chapter?: OrderValue$1
  }
  includes?: RelationshipList[]
  includeEmptyPages?: 0 | 1
  includeFuturePublishAt?: 0 | 1
  includeExternalUrl?: 0 | 1
}

type OrderValue = 'asc' | 'desc'
type ContentRating = 'safe' | 'suggestive' | 'erotica' | 'pornographic'
interface ChapterQueries {
  limit?: number | string
  offset?: number | string
  ids?: string[]
  title?: string
  groups?: string[]
  uploader?: string
  manga?: string
  volume?: string[] | number[]
  chapter?: string
  translatedLanguage?: TwoLetterLocale[]
  originalLanguage?: TwoLetterLocale[]
  excludedOriginalLanguage?: TwoLetterLocale[]
  contentRating?: ContentRating[]
  excludedGroups?: string[]
  excludedUploaders?: string[]
  includeFutureUpdates?: 0 | 1 | '0' | '1'
  includeEmptyPages?: 0 | 1 | '0' | '1'
  includeFuturePublishAt?: 0 | 1 | '0' | '1'
  includeExternalUrl?: 0 | 1 | '0' | '1'
  createdAtSince?: string
  updatedAtSinceupdatedAtSince?: string
  publishAtSince?: string
  order?: {
    createdAt?: OrderValue
    updatedAt?: OrderValue
    publishAt?: OrderValue
    readableAt?: OrderValue
    volume?: OrderValue
    chapter?: OrderValue
  }
  includes?: RelationshipList[]
}
type ChapterContent = {
  id: string
  type: 'chapter'
  attributes: {
    volume?: string
    chapter: string
    title: string
    translatedLanguage: string
    externalUrl?: string
    publishAt: string
    readableAt: string
    createdAt: string
    updatedAt: string
    pages: number
    version: number
  }
  relationships: {
    id: string
    type: RelationshipList
  }[]
}
export interface ChapterResponse {
  result: string
  response: string
  data: ChapterContent
}
interface FilledRelationship {
  user: {
    id: string
    type: 'user'
    attributes: {
      username: string
      roles: 'ROLE_GROUP_MEMBER' | 'ROLE_MEMBER' | 'ROLE_GROUP_LEADER'[]
      version: number
    }
  }
  manga: Omit<MangaContent, 'relationships'>
  scanlation_group: {
    id: string
    type: 'scanlation_group'
    attributes: {
      name: string
      altnames?: string[]
      locked: boolean
      website?: string
      ircServer?: string
      ircChannel?: string
      discord?: string
      contactEmail?: string
      description?: string
      twitter?: string
      mangaUpdates?: string
      focusedLanguages: TwoLetterLocale[]
      official: boolean
      verified: boolean
      inactive: boolean
      publishDelay?: string
      createdAt: string
      updatedAt: string
      version: number
    }
  }
}
type EmptyRelationship = [
  {
    id: string
    type: 'manga'
  },
  {
    id: string
    type: 'scanlation_group'
  },
  {
    id: string
    type: 'user'
  }
]
type RelationshipList = 'user' | 'scanlation_group' | 'manga'
type WithRelationships<T extends RelationshipList> = {
  relationships: Union2Tuple<
    | Exclude<
        EmptyRelationship[number],
        {
          type: T
        }
      >
    | FilledRelationship[T]
  >
}
type ChapterWithRelationship<T extends RelationshipList> = {
  result: string
  response: string
  data: Omit<ChapterContent, 'relationships'> & WithRelationships<T>
}
type ChapterArray<T extends RelationshipList> = {
  result: string
  response: string
  data: (Omit<ChapterContent, 'relationships'> & WithRelationships<T>)[]
}

type ChapterArrayPromise<T extends RelationshipList> = Promise<ChapterArray<T>>
type PromisedChapter<T> = Promise<T>
type HasWithoutIds$1<T> = Omit<ChapterQueries, 'ids'> & {
  includes: T[]
}
type Has$1<T> = ChapterQueries & {
  includes: T[]
}
declare class ChapterEndpoint {
  private baseURL
  private fetcher
  constructor(baseURL: string)
  get(
    id: string,
    query?: Omit<ChapterQueries, 'ids' | 'includes'>
  ): PromisedChapter<ChapterResponse>
  get(
    id: string,
    query?: HasWithoutIds$1<'user'>
  ): PromisedChapter<ChapterWithRelationship<'user'>>
  get(
    id: string,
    query?: HasWithoutIds$1<'scanlation_group'>
  ): PromisedChapter<ChapterWithRelationship<'scanlation_group'>>
  get(
    id: string,
    query?: HasWithoutIds$1<'manga'>
  ): PromisedChapter<ChapterWithRelationship<'manga'>>
  get(
    id: string,
    query?: HasWithoutIds$1<'user' | 'scanlation_group'>
  ): PromisedChapter<ChapterWithRelationship<'user' | 'scanlation_group'>>
  get(
    id: string,
    query?: HasWithoutIds$1<'user' | 'manga'>
  ): PromisedChapter<ChapterWithRelationship<'user' | 'manga'>>
  get(
    id: string,
    query?: HasWithoutIds$1<'scanlation_group' | 'manga'>
  ): PromisedChapter<ChapterWithRelationship<'scanlation_group' | 'manga'>>
  get(
    id: string,
    query?: HasWithoutIds$1<'user' | 'scanlation_group' | 'manga'>
  ): PromisedChapter<ChapterWithRelationship<'user' | 'scanlation_group' | 'manga'>>
  get(query: Omit<ChapterQueries, 'includes'>): Promise<ChapterResponse>
  get(query: Has$1<'user'>): ChapterArrayPromise<'user'>
  get(query: Has$1<'scanlation_group'>): ChapterArrayPromise<'scanlation_group'>
  get(query: Has$1<'manga'>): ChapterArrayPromise<'manga'>
  get(
    query: Has$1<'user' | 'scanlation_group'>
  ): ChapterArrayPromise<'user' | 'scanlation_group'>
  get(query: Has$1<'user' | 'manga'>): ChapterArrayPromise<'user' | 'manga'>
  get(
    query: Has$1<'scanlation_group' | 'manga'>
  ): ChapterArrayPromise<'scanlation_group' | 'manga'>
  get(
    query: Has$1<'user' | 'scanlation_group' | 'manga'>
  ): ChapterArrayPromise<'user' | 'scanlation_group' | 'manga'>
}

export type MangaArrayPromise<T extends RelationshipList$1> = Promise<MangaArray<T>>
type PromisedManga<T extends RelationshipList$1> = Promise<MangaWithRelationship<T>>
type HasWithoutIds<T> = Omit<MangaQueries, 'ids'> & {
  includes: T[]
}
type Has<T> = MangaQueries & {
  includes: T[]
}
type FeedArrayPromise<T extends RelationshipList> = Promise<
  FeedResponseWithRelationship<T>
>
type FeedHas<T> = FeedQueries & {
  includes: T[]
}
declare class MangaEndpoint {
  private baseURL
  private fetcher
  constructor(baseURL: string)
  get(id: string, query?: Omit<MangaQueries, 'ids' | 'includes'>): Promise<MangaResponse>
  get(id: string, query?: HasWithoutIds<'author'>): PromisedManga<'author'>
  get(id: string, query?: HasWithoutIds<'cover_art'>): PromisedManga<'cover_art'>
  get(id: string, query?: HasWithoutIds<'artist'>): PromisedManga<'artist'>
  get(
    id: string,
    query?: HasWithoutIds<'author' | 'cover_art'>
  ): PromisedManga<'author' | 'cover_art'>
  get(
    id: string,
    query?: HasWithoutIds<'author' | 'artist'>
  ): PromisedManga<'author' | 'artist'>
  get(
    id: string,
    query?: HasWithoutIds<'cover_art' | 'artist'>
  ): PromisedManga<'cover_art' | 'artist'>
  get(
    id: string,
    query?: HasWithoutIds<'author' | 'cover_art' | 'artist'>
  ): PromisedManga<'author' | 'cover_art' | 'artist'>
  get(query: Omit<MangaQueries, 'includes'>): Promise<MangaResponse>
  get(query: Has<'author'>): MangaArrayPromise<'author'>
  get(query: Has<'artist'>): MangaArrayPromise<'artist'>
  get(query: Has<'cover_art'>): MangaArrayPromise<'cover_art'>
  get(query: Has<'author' | 'artist'>): MangaArrayPromise<'author' | 'artist'>
  get(query: Has<'author' | 'cover_art'>): MangaArrayPromise<'author' | 'cover_art'>
  get(query: Has<'artist' | 'cover_art'>): MangaArrayPromise<'artist' | 'cover_art'>
  get(
    query: Has<'author' | 'artist' | 'cover_art'>
  ): MangaArrayPromise<'author' | 'artist' | 'cover_art'>
  getRandom(queries?: Omit<RandomMangaQueries, 'includes'>): Promise<MangaResponse>
  getRandom(
    queries?: RandomMangaQueries & {
      includes: ['author']
    }
  ): PromisedManga<'author'>
  getRandom(
    queries?: RandomMangaQueries & {
      includes: ['artist']
    }
  ): PromisedManga<'artist'>
  getRandom(
    queries?: RandomMangaQueries & {
      includes: ['cover_art']
    }
  ): PromisedManga<'cover_art'>
  getRandom(
    queries?: RandomMangaQueries & {
      includes: 'author' | 'artist'[]
    }
  ): PromisedManga<'author' | 'artist'>
  getRandom(
    queries?: RandomMangaQueries & {
      includes: 'author' | 'cover_art'[]
    }
  ): PromisedManga<'author' | 'cover_art'>
  getRandom(
    queries?: RandomMangaQueries & {
      includes: 'artist' | 'cover_art'[]
    }
  ): PromisedManga<'artist' | 'cover_art'>
  getRandom(
    queries?: RandomMangaQueries & {
      includes: 'author' | 'artist' | 'cover_art'[]
    }
  ): PromisedManga<'author' | 'artist' | 'cover_art'>
  getFeed(id: string, query?: Omit<FeedQueries, 'includes'>): Promise<FeedResponse>
  getFeed(id: string, query?: FeedHas<'user'>): FeedArrayPromise<'user'>
  getFeed(
    id: string,
    query?: FeedHas<'scanlation_group'>
  ): FeedArrayPromise<'scanlation_group'>
  getFeed(id: string, query?: FeedHas<'manga'>): FeedArrayPromise<'manga'>
  getFeed(
    id: string,
    query?: FeedHas<'user' | 'scanlation_group'>
  ): FeedArrayPromise<'user' | 'scanlation_group'>
  getFeed(
    id: string,
    query?: FeedHas<'user' | 'manga'>
  ): FeedArrayPromise<'user' | 'manga'>
  getFeed(
    id: string,
    query?: FeedHas<'scanlation_group' | 'manga'>
  ): FeedArrayPromise<'scanlation_group' | 'manga'>
  getFeed(
    id: string,
    query?: FeedHas<'user' | 'scanlation_group' | 'manga'>
  ): FeedArrayPromise<'user' | 'scanlation_group' | 'manga'>
}

interface MangaStatistics {
  result: string
  statistics: Record<
    string,
    {
      comments: {
        threadID: number
        repliesCount: number
      }
      follows: number
      rating: {
        average: number
        bayesian: number
      }
    }
  >
}
export interface MangaStatisticsAdvanced {
  result: string
  statistics: Record<
    string,
    {
      comments: {
        threadID: number
        repliesCount: number
      }
      rating: {
        average: number
        bayesian: number
        distribution: Record<string, number>
      }
      follows: number
    }
  >
}
interface ChapterStatistics {
  result: string
  statistics: Record<
    string,
    {
      comments: {
        threadID: number
        repliesCount: number
      }
    }
  >
}

declare class StatisticsEndpoint {
  private baseURL
  private fetcher
  constructor(baseURL: string)
  getManga(id: string): Promise<MangaStatistics>
  getManga(id: string[]): Promise<MangaStatisticsAdvanced>
  getChapter(id: string | string[]): Promise<ChapterStatistics>
}

interface MangadexAPIOptions {
  baseURL: string
}
declare class MangaDexApi {
  private baseURL
  /**
   * @param options.baseURL The base url of the api (for proxying) (default: https://api.mangadex.org)
   */
  constructor(options?: MangadexAPIOptions)
  get manga(): MangaEndpoint
  get atHome(): AtHomeEndpoint
  get chapter(): ChapterEndpoint
  get statistics(): StatisticsEndpoint
}

export { MangaDexApi as default }
