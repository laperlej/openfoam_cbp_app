export const warningFilter = (console, originalWarn, patternList) => {
  console.warn = (msg) => {
    let msgString = ''
    if (typeof msg === 'string') {
      msgString = msg.toString()
    }
    if (msg instanceof HTMLElement) {
      msgString = msg.outerHTML
    }
    !patternList.some((pattern) => msgString.includes(pattern)) &&
      originalWarn(msg)
  }
}
