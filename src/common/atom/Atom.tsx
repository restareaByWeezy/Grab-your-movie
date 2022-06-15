import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { IListItem } from 'types/movie'
import store from 'storejs'

//  객체로 합치기

const { persistAtom } = recoilPersist()

export const movieListAtom = atom<IListItem[]>({
  key: '#searchMovieListAtom',
  default: [],
})

export const inputTextAtom = atom({
  key: '#searchInputAtom',
  default: '',
})

export const pageNumberAtom = atom({
  key: '#pageNumberAtom',
  default: 1,
})

export const favListAtom = atom({
  key: '#favListAtom',
  default: store.get('favList') || [],
  effects_UNSTABLE: [persistAtom],
})

export const toggleLinkAtom = atom({
  key: '#toggleLinkAtom',
  default: {
    toggle: false,
    text: '',
    movieItem: null,
  },
})

export const isLoadingAtom = atom({
  key: '#isLoadingAtom',
  default: false,
})

export const currentMovieAtom = atom<IListItem>({
  key: '#currentMovieAtom',
  default: {
    Title: '',
    Type: '',
    Year: '',
    imdbID: '',
    Poster: '',
  },
})

export const modalOpenAtom = atom<boolean>({ key: '#modalOpenAtom', default: false })

export const maxPageAtom = atom<number>({ key: '#maxPageAtom', default: 1 })
