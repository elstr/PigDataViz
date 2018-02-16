import React, { Component } from 'react'
import {scaleLinear} from 'd3-scale'
import {chartColors} from '../../config/constants'

/* Bars are rendered completely by React and d3 is used for math */

export default class Bars extends Component {
  constructor(props) {
    super(props)
    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#2196F3', '#1976D2'])
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum.island}
          x={xScale(datum.island)}
          y={yScale(datum.pigPopulation)}
          height={height - margins.bottom - scales.yScale(datum.pigPopulation)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.pigPopulation)}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}