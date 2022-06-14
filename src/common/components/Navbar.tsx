import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { toggleLinkAtom } from '../atom/Atom'
import { AiOutlineSearch, AiOutlineStar } from 'react-icons/ai'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const [link, setLink] = useRecoilState(toggleLinkAtom)
  const handleLink = () => {
    setLink((prev) => ({ ...link, toggle: !prev.toggle }))
  }

  return (
    <div className={styles.container}>
      <NavLink
        to='/'
        onClick={handleLink}
        className={({ isActive }) => styles.searchWrapper + (isActive ? ` ${styles.selected}` : '')}
      >
        <AiOutlineSearch className={styles.searchIcon} />
      </NavLink>
      <NavLink
        to='/favorite'
        onClick={handleLink}
        className={({ isActive }) => styles.starWrapper + (isActive ? ` ${styles.selected}` : '')}
      >
        <AiOutlineStar className={styles.starIcon} />
      </NavLink>
    </div>
  )
}

export default Navbar
