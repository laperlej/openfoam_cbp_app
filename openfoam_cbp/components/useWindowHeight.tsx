import { useState, useEffect } from 'react'

function getWindowDimensions() {
  const { innerHeight: height } = window
  return height
}

const useWindowHeight = () => {
  const [windowDimensions, setWindowDimensions] = useState(0)
  useEffect(() => {
    setWindowDimensions(getWindowDimensions())
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowDimensions
}

export default useWindowHeight
