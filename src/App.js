import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Main} from './Components/index'

import './App.css'

const App = () =>
  <Router>
    <Route path="/:paused?:year?" component={Main} />
  </Router>


export default App
