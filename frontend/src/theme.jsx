import { extendTheme } from '@chakra-ui/react'
// import {mode} from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}


const theme = extendTheme({ config })

export default theme