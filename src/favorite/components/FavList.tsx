/* eslint-disable @typescript-eslint/no-shadow */
// @ts-nocheck

import { useRef } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'

import styles from './FavList.module.scss'

import Modal from 'common/components/Modal/Modal'
import { currentMovieAtom, favListAtom, modalOpenAtom } from 'common/atom/Atom'

const FavList = () => {
  const [favList, setFavList] = useRecoilState(favListAtom)
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setCurrentMovie] = useRecoilState<IListItem[]>(currentMovieAtom)
  const [, setShowModal] = useRecoilState(modalOpenAtom)

  //  dnd logic

  const ref = useRef()

  const handleChange = (result: DropResult) => {
    if (!result.destination) return
    const items = [...favList]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFavList(items)
  }

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
  const closeModal = () => {
    setShowModal(false)
  }

  const favListMap = (
    <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId='FavList'>
        {(provided) => (
          <ul className='favList' {...provided.droppableProps} ref={provided.innerRef}>
            {favList.map(({ imdbID, Poster, Title, Year, Type }, index: number) => (
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
                        <div className={styles.movieTitle}>{Title}</div>
                        <span className={styles.year}>{Year}</span>
                        <span className={styles.genre}>{Type}</span>
                      </span>
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
    <div className={styles.container}>
      <h1 className={styles.title}>My Movies</h1>
      <ul className={styles.listWrapper}>
        {favList.length === 0 && <span className={styles.noMovie}>영화를 Grab 해보세요!</span>}
        {favListMap}
        <li ref={ref} />
        <Modal close={closeModal} header='Will you grab this movie?' />
      </ul>
    </div>
  )
}

export default FavList
