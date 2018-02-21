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
    const {orient, scale, tickSize} = this.props
    const axisType = `axis${orient}`
    const axis = d3Axis[axisType]()
    .scale(scale)
    .tickSize(-tickSize) /* w/o the negative tickSize it renders ticks out of the axis scale */
    .tickPadding([10]) /* padding from the Y value to the chart Y line */
    .ticks([6]) /* w/o ticks it shows all the values in the Y scale */

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