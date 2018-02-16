import React, { Component } from 'react'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import './style.css'

/* We want React to render <g> elements, and after it will mount we want d3 to create our axis.
   To accomplish this, we need to assign <g> to the class property (this.axisElement) using ref callback function.
   This allows referencing elements in componentDidMount lifecycle method.
   To make axis responsive, we need to re-render it after each update in componentDidUpdate method.

   tickSize will be used to render grid and needs to equal to chart width and height accordingly
*/

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const axisType = `axis${this.props.orient}`
    const axis = d3Axis[axisType]()
    .scale(this.props.scale)
    .tickSize(-this.props.tickSize)
    .tickPadding([10])
    .ticks([6])

    d3Select(this.axisElement).call(axis)
  }

  render() {
    return (
      <g
        className={`axis axis-${this.props.orient}`}
        ref={el => { this.axisElement = el }}
        transform={this.props.translate}
      />
    )
  }
}