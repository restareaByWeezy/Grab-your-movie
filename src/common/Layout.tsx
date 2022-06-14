import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { cx } from 'styles'

import styles from './Layout.module.scss'

import { modalOpenAtom } from './atom/Atom'
import Header from './components/Header'
import Navbar from './components/Navbar'

const Layout = () => {
  const modalOpen = useRecoilValue<boolean>(modalOpenAtom)

  return (
    <div className={styles.background}>
      <div id='container' className={cx(styles.container, { [styles.isOpen]: modalOpen })}>
        <div className={styles.wrapper}>
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
        <footer>
          <Navbar />
        </footer>
      </div>
    </div>
  )
}

export default Layout
