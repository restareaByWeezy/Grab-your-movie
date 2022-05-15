export interface IParams {
  keyword: string
  pageNum: number
}

export interface IListItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IMovieAPIRes {
  Search: IListItem[]
  totalResults: string
  Response: string
}
