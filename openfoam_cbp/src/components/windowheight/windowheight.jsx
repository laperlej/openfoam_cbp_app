import {useState, useEffect} from 'react'

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return height;
  }
  
  const useWindowHeight = () => {
      const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
  
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
      return windowDimensions;
  };

  export default useWindowHeight;