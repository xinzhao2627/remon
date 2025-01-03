import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import RandomSentence from './RandomSentence'
import {ChakraProvider} from '@chakra-ui/react'
import theme from './theme'
import { ColorModeScript } from '@chakra-ui/react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Quiz from './Quiz'
import Custom from './Custom'
import CustomInput from './CustomInput'
import Home from './Home'
import ErrorPage from './ErrorPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ChakraProvider>
    <Router>
      <ColorModeScript initialColorMode={theme} />
      <Routes>
        <Route exact path = '/home' Component={Home}/>
        <Route exact path = '/' Component={Home}/>
        <Route exact path='/random' Component={RandomSentence}/>
        <Route exact path='/quiz' Component={Quiz}/>
        <Route exact path='/custom' Component={Custom}/>
        <Route exact path='/custominput' Component={CustomInput}/>
        <Route exact path = '*' Component={ErrorPage}/>
      </Routes>
    </Router>
</ChakraProvider>

  </React.StrictMode>,
)
