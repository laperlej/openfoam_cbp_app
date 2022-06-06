import React from 'react'
import styles from './TopNav.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

const TopNav = () => {
  const location = useRouter()
  return (
    <div className={styles.topnav}>
      <Link href={'/solver'}>
        <a className={location.pathname === '/solver' ? styles.active : null}>
          Solver
        </a>
      </Link>
      <Link href={'/edit'}>
        <a className={location.pathname === '/edit' ? styles.active : null}>
          Edit
        </a>
      </Link>
      <Link href={'/run'}>
        <a className={location.pathname === '/run' ? styles.active : null}>
          Run
        </a>
      </Link>
      <Link href={'/log'}>
        <a className={location.pathname === '/log' ? styles.active : null}>
          Log
        </a>
      </Link>
      <Link href={'/postprocess'}>
        <a
          className={
            location.pathname === '/postprocess' ? styles.active : null
          }
        >
          Postprocess
        </a>
      </Link>
      <Link href={'/help'}>
        {
          <a className={location.pathname === '/help' ? styles.active : null}>
            Help
          </a>
        }
      </Link>
    </div>
  )
}

export default TopNav
