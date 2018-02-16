import React from 'react'
import {Chart, Footer, Header} from '../index'

import './style.css'

const Main = props =>
  <div className="main-container">
    <Header />
    <Chart {...props}/>
    <Footer />
  </div>

export default Main