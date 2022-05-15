/* eslint-disable @typescript-eslint/no-shadow */
// @ts-nocheck

import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ReactLoading from 'react-loading'

import { AiOutlineStar } from 'react-icons/ai'
import Modal from 'src/common/components/Modal'

import styles from './List.module.scss'

import { currentMovieAtom, isLoadingAtom, modalOpenAtom, movieListAtom, pageNumberAtom } from '../../common/atom/Atom'

const List = () => {
  const [movieList, setMovieList] = useRecoilState(movieListAtom)
  const [, setPage] = useRecoilState(pageNumberAtom)
  const [, setCurrentMovie] = useRecoilState<IListItem[]>(currentMovieAtom)
  const isLoading = useRecoilValue(isLoadingAtom)

  const [showModal, setShowModal] = useRecoilState(modalOpenAtom)

  const fetchRef = useRef()
  //  intersection observer
  useEffect(() => {
    if (movieList.length < 11 && movieList.length > 0) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1)
        }
      })
      io.observe(fetchRef.current)
    }
  }, [movieList, setPage])

  //  dnd logic

  const handleChange = (result: { destination: { index: number }; source: { index: number } }) => {
    if (!result.destination) return
    const items = [...movieList]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setMovieList(items)
  }

  //  Modal

  const openModal = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {(provided) => (
          <ul className='movie' {...provided.droppableProps} ref={provided.innerRef}>
            {movieList.map(({ imdbID, Poster, Title, Year, Type }, index) => (
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
                      <AiOutlineStar className={styles.starIcon} />
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )

  return (
    <ul className={styles.container}>
      {movieList.length === 0 && <span className={styles.noMovie}>검색 결과가 없습니다.</span>}
      {movieListMap}
      <Modal modalOpen={showModal} header='Will you grab this movie?' description='Grab?' />
      {isLoading ? <ReactLoading className={styles.loading} type='spin' color='purple' height={50} width={50} /> : ''}
      <li ref={fetchRef} />
    </ul>
  )
}

export default List
