import { Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'

import Header from './components/Header'
import Navbar from './components/Navbar'

const Layout = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
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
