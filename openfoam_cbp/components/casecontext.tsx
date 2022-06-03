import { createContext } from 'react'
import { emptyState } from './emptyState'

const CaseContext = createContext({ state: emptyState, dispatch: () => {} })

export default CaseContext
