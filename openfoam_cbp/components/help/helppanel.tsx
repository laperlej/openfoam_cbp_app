import React from 'react'
import HelpMdx from './help.mdx'
import styles from './HelpPanel.module.css'

export const HelpPanel = () => {
  return (
    <div className={styles.helpMargin}>
      <HelpMdx />
    </div>
  )
}
