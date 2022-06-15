import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import ReactLoading from 'react-loading'

import Modal from 'common/components/Modal/Modal'

import styles from './List.module.scss'

import { currentMovieAtom, isLoadingAtom, modalOpenAtom, movieListAtom, pageNumberAtom } from '../../common/atom/Atom'

const List = () => {
  const [movieList, setMovieList] = useRecoilState(movieListAtom)
  const [, setPage] = useRecoilState(pageNumberAtom)
  const [, setCurrentMovie] = useRecoilState(currentMovieAtom)
  const isLoading = useRecoilValue(isLoadingAtom)

  const [, setShowModal] = useRecoilState(modalOpenAtom)

  const fetchRef = useRef<HTMLLIElement>(null)

  //  intersection observer
  useEffect(() => {
    if (movieList.length < 11 && movieList.length > 0) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1)
        }
      })
      fetchRef.current && io.observe(fetchRef.current)
    }
  }, [movieList, setPage])

  //  dnd logic

  const handleChange = (result: DropResult): void => {
    const { destination, source } = result
    if (!destination) return
    const items = [...movieList]
    const [reorderedItem] = items.splice(source.index, 1)
    items.splice(destination.index, 0, reorderedItem)

    setMovieList(items)
  }

  //  Modal

  const openModal = (e: React.MouseEvent<HTMLInputElement>) => {
    const { poster, title, year, type, imdbid } = e.currentTarget.dataset
    const items = {
      Title: title,
      Type: type,
      Year: year,
      imdbID: imdbid,
      Poster: poster,
    }

    setCurrentMovie(items)
    setShowModal(true)
  }

  //  ListItem

  const movieListMap = (
    <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId='movieList'>
        {(provide) => (
          <ul className='movie' {...provide.droppableProps} ref={provide.innerRef}>
            {movieList.map(({ imdbID, Poster, Title, Year, Type }, index) => {
              return (
                <Draggable key={imdbID} draggableId={`draggable-${imdbID}`} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <div
                        className={styles.list}
                        data-poster={Poster}
                        data-title={Title}
                        data-type={Type}
                        data-year={Year}
                        data-imdbid={imdbID}
                        onClick={openModal}
                        aria-hidden='true'
                      >
                        <img src={Poster} className={styles.movieImg} alt='none' />
                        <span className={styles.detail}>
                          <div className={styles.title}>{Title}</div>
                          <span className={styles.year}>{Year}</span>
                          <span className={styles.genre}>{Type}</span>
                        </span>
                      </div>
                    </li>
                  )}
                </Draggable>
              )
            })}
            {provide.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )

  return (
    <ul className={styles.container}>
      {movieList.length === 0 && <span className={styles.noMovie}>검색 결과가 없습니다.</span>}
      {movieListMap}
      <Modal header='Will you grab this movie?' />
      {isLoading ? <ReactLoading className={styles.loading} type='spin' color='purple' height={50} width={50} /> : ''}
      <li ref={fetchRef} />
    </ul>
  )
}

export default List
