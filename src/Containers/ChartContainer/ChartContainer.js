import React, { Component } from 'react'
import * as d3 from "d3"
import {formatDateIntoYear, formatDate } from '../../config/constants'

let svg, currentValue, handle

const margin = {top:50, right:50, bottom:0, left:50}
const width = 960 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom
const moving = false
const targetValue = width
const startDate = '11/24/04'
const endDate = '12/24/09'


export default class ChartContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSet: props.dataSet,
    }
  }
  componentDidMount() {
    this.setContext()
  }


  setContext() {
    svg = d3.select("#vis")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
  }

  render() {
    return (
      <div id="vis"></div>
    )
  }
}
