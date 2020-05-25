/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'

export default props => {
  const [ mode, setMode ] = useColorMode()
  return (
    <button
      {...props}
      onClick={e => {
        const next = mode === 'dark' ? 'light' : 'dark'
        setMode(next)
      }}
    >[switch theme]</button>
  )
}