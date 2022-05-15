import React from 'react'
import styles from './Navbar.module.scss'
import { AiOutlineSearch, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toggleLinkAtom } from '../atom/Atom'
import { useRecoilState } from 'recoil'

const Navbar = () => {
  const [link, setLink] = useRecoilState(toggleLinkAtom)
  const handleLink = () => {
    setLink((prev) => ({ ...link, toggle: !prev.toggle }))
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/' onClick={handleLink} className={styles.searchWrapper}>
          <AiOutlineSearch className={styles.searchIcon} />
        </Link>
        <Link to='/favorite' onClick={handleLink} className={styles.starWrapper}>
          <AiOutlineStar className={styles.starIcon} />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
