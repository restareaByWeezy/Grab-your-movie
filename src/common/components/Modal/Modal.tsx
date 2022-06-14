import ModalPortal from './portal'

import { useRecoilState, useRecoilValue } from 'recoil'
import { IListItem } from 'types/movie'
import { currentMovieAtom, favListAtom, modalOpenAtom } from '../../atom/Atom'

import './Modal.scss'

interface IProps {
  header: string
}

const ModalContent = ({ header }: IProps) => {
  const currentMovie = useRecoilValue<IListItem[]>(currentMovieAtom)
  const [favList, setFavList] = useRecoilState(favListAtom)
  const [modalOpen, setModalOpen] = useRecoilState<boolean>(modalOpenAtom)

  const handleCancel = () => {
    setFavList(favList.filter((item: { imdbID: string }) => item.imdbID !== Object(currentMovie).imdbID))
    setModalOpen(false)
  }

  const handleAddMovie = () => {
    setFavList((prev: IListItem[]) => [...prev, currentMovie])
    setModalOpen(false)
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <ModalPortal>
      <div className={modalOpen ? 'openModal modal' : 'modal'}>
        {modalOpen ? (
          <section>
            <header>{header}</header>
            <main>
              {favList.filter((el: { imdbID: string }) => el.imdbID.includes(Object(currentMovie).imdbID)).length
                ? 'Delete?'
                : 'Grab?'}
            </main>
            <footer>
              {favList.filter((el: { imdbID: string }) => el.imdbID.includes(Object(currentMovie).imdbID)).length ? (
                <button type='button' onClick={handleCancel}>
                  delete
                </button>
              ) : (
                <button type='button' onClick={handleAddMovie}>
                  <span>grab</span>
                </button>
              )}
              <button type='button' className='close' onClick={handleCancel}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </ModalPortal>
  )
}

export default ModalContent
